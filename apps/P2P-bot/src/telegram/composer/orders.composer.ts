import { Composer } from 'grammy';
import { BotContext } from '../types/session.types';
import {
  AmountSort,
  OrderFilter,
  TimeSort,
  TradeTypeFilter,
} from '../types/orders.types';
import { mockOrders } from '../data/orders.mock';
import { formatOrderDetails } from '../messages/orders.messages';
import { ordersCommand, showOrders } from '../commands/orders.command';

export const ordersComposer = new Composer<BotContext>();

const filters: OrderFilter[] = [
  'all',
  'in_progress',
  'completed',
  'cancelled',
  'appeal',
  'expired',
];

function nextFilter(current: OrderFilter): OrderFilter {
  const index = filters.indexOf(current);
  return filters[(index + 1) % filters.length];
}

ordersComposer.command('orders', ordersCommand);

ordersComposer.callbackQuery('ord:n', async (ctx) => {
  await ctx.answerCallbackQuery();
});


ordersComposer.callbackQuery(
  /^ord:t:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL)$/,
  async (ctx) => {
    const filter = ctx.match[1] as OrderFilter;
    const timeSort = ctx.match[2] as TimeSort;
    const amountSort = ctx.match[3] as AmountSort;
    const tradeType = ctx.match[4] as TradeTypeFilter;

    await ctx.answerCallbackQuery();

    await showOrders(
      ctx,
      0,
      filter,
      timeSort === 'newest' ? 'oldest' : 'newest',
      amountSort,
      tradeType,
      true,
    );
  },
);


ordersComposer.callbackQuery(
  /^ord:s:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL)$/,
  async (ctx) => {
    const filter = ctx.match[1] as OrderFilter;
    const timeSort = ctx.match[2] as TimeSort;
    const amountSort = ctx.match[3] as AmountSort;
    const tradeType = ctx.match[4] as TradeTypeFilter;

    await ctx.answerCallbackQuery();

    await showOrders(
      ctx,
      0,
      nextFilter(filter),
      timeSort,
      amountSort,
      tradeType,
      true,
    );
  },
);


ordersComposer.callbackQuery(
  /^ord:a:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL)$/,
  async (ctx) => {
    const filter = ctx.match[1] as OrderFilter;
    const timeSort = ctx.match[2] as TimeSort;
    const amountSort = ctx.match[3] as AmountSort;
    const tradeType = ctx.match[4] as TradeTypeFilter;

    await ctx.answerCallbackQuery();

    await showOrders(
      ctx,
      0,
      filter,
      timeSort,
      amountSort === 'asc' ? 'desc' : 'asc',
      tradeType,
      true,
    );
  },
);

ordersComposer.callbackQuery(
  /^ord:y:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL)$/,
  async (ctx) => {
    const filter = ctx.match[1] as OrderFilter;
    const timeSort = ctx.match[2] as TimeSort;
    const amountSort = ctx.match[3] as AmountSort;
    const tradeType = ctx.match[4] as TradeTypeFilter;

    const nextType: TradeTypeFilter =
      tradeType === 'all'
        ? 'BUY'
        : tradeType === 'BUY'
          ? 'SELL'
          : 'all';

    await ctx.answerCallbackQuery();

    await showOrders(
      ctx,
      0,
      filter,
      timeSort,
      amountSort,
      nextType,
      true,
    );
  },
);


ordersComposer.callbackQuery(
  /^ord:p:(\d+):(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL)$/,
  async (ctx) => {
    const page = Number(ctx.match[1]);
    const filter = ctx.match[2] as OrderFilter;
    const timeSort = ctx.match[3] as TimeSort;
    const amountSort = ctx.match[4] as AmountSort;
    const tradeType = ctx.match[5] as TradeTypeFilter;

    await ctx.answerCallbackQuery();

    await showOrders(
      ctx,
      page,
      filter,
      timeSort,
      amountSort,
      tradeType,
      true,
    );
  },
);


ordersComposer.callbackQuery(/^ord:d:(\d+)$/, async (ctx) => {
  const orderNumber = ctx.match[1];

  await ctx.answerCallbackQuery();

  const order = mockOrders.find(
    (item) => item.orderNumber === orderNumber,
  );

  if (!order) {
    await ctx.reply('Ордер не найден.');
    return;
  }

  await ctx.reply(formatOrderDetails(order), {
    parse_mode: 'HTML',
  });
});