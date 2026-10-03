import type { Context } from 'grammy';

import type { OrdersService } from '../orders.service';
import { ordersKeyboard } from '../keyboards/orders.keyboard';
import { formatOrdersList } from '../messages/orders.messages';

import type {
  AmountSort,
  OrderFilter,
  SortBy,
  TimeSort,
  TradeTypeFilter,
} from '../types/orders.types';

const PAGE_SIZE = 6;

export function createOrdersCommand(ordersService: OrdersService) {
  async function showOrders(
    ctx: Context,
    page = 0,
    filter: OrderFilter = 'all',
    timeSort: TimeSort = 'newest',
    amountSort: AmountSort = 'desc',
    tradeType: TradeTypeFilter = 'all',
    edit = false,
    sortBy: SortBy = 'time',
  ): Promise<void> {
    const result = await ordersService.getOrders(
      page,
      PAGE_SIZE,
      filter,
      timeSort,
      amountSort,
      tradeType,
      sortBy,
    );

    const keyboard = ordersKeyboard(
      result.orders,
      result.page,
      result.totalPages,
      filter,
      timeSort,
      amountSort,
      tradeType,
      sortBy,
    );

    const text = formatOrdersList(
      result.orders,
    );

    if (edit && ctx.callbackQuery?.message) {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      });
      return;
    }

    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });
  }

  async function ordersCommand(ctx: Context): Promise<void> {
    await showOrders(ctx);
  }

  return {
    showOrders,
    ordersCommand,
  };
}