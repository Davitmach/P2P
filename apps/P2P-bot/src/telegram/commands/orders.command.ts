import { Context } from 'grammy';
import { mockOrders } from '../data/orders.mock';
import { ordersKeyboard } from '../keyboards/orders.keyboard';
import { formatOrdersList } from '../messages/orders.messages';
import {
  AmountSort,
  OrderFilter,
  P2POrder,
  TimeSort,
  TradeTypeFilter,
} from '../types/orders.types';

const PAGE_SIZE = 6;

export function filterOrders(
  filter: OrderFilter,
  timeSort: TimeSort,
  amountSort: AmountSort,
  tradeType: TradeTypeFilter,
): P2POrder[] {
  const result = mockOrders.filter((order) => {
    if (tradeType !== 'all' && order.tradeType !== tradeType) {
      return false;
    }

    switch (filter) {
      case 'in_progress':
        return [0, 1, 2, 3].includes(order.orderStatus);
      case 'completed':
        return order.orderStatus === 4;
      case 'cancelled':
        return order.orderStatus === 6;
      case 'appeal':
        return order.orderStatus === 5;
      case 'expired':
        return order.orderStatus === 7;
      default:
        return true;
    }
  });

  return result.sort((a, b) => {
    const amountDifference =
      Number(a.totalPrice) - Number(b.totalPrice);

    if (amountDifference !== 0) {
      return amountSort === 'asc'
        ? amountDifference
        : -amountDifference;
    }

    return timeSort === 'newest'
      ? b.createTime - a.createTime
      : a.createTime - b.createTime;
  });
}

export async function showOrders(
  ctx: Context,
  page = 0,
  filter: OrderFilter = 'all',
  timeSort: TimeSort = 'newest',
  amountSort: AmountSort = 'desc',
  tradeType: TradeTypeFilter = 'all',
  edit = false,
): Promise<void> {
  const filtered = filterOrders(
    filter,
    timeSort,
    amountSort,
    tradeType,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE),
  );

  const safePage = Math.max(
    0,
    Math.min(page, totalPages - 1),
  );

  const pageOrders = filtered.slice(
    safePage * PAGE_SIZE,
    (safePage + 1) * PAGE_SIZE,
  );

  const keyboard = ordersKeyboard(
    pageOrders,
    safePage,
    totalPages,
    filter,
    timeSort,
    amountSort,
    tradeType,
  );

  if (edit && ctx.callbackQuery?.message) {
    await ctx.editMessageText(formatOrdersList(), {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });
    return;
  }

  await ctx.reply(formatOrdersList(), {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  });
}

export async function ordersCommand(ctx: Context): Promise<void> {
  await showOrders(ctx);
}