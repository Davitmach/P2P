import { Composer } from 'grammy';
import type { BotContext } from '../types/session.types';

import type { OrdersService } from '../orders.service';

import type {
  AmountSort,
  OrderFilter,
  SortBy,
  TimeSort,
  TradeTypeFilter,
} from '../types/orders.types';

import { formatOrderDetails } from '../messages/orders.messages';
import { createOrdersCommand } from '../commands/orders.command';

export function createOrdersComposer(
  ordersService: OrdersService,
): Composer<BotContext> {
  const ordersComposer = new Composer<BotContext>();

  const { ordersCommand, showOrders } =
    createOrdersCommand(ordersService);

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
    /^ord:t:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL):(time|amount)$/,
    async (ctx) => {
      const filter = ctx.match[1] as OrderFilter;
      const timeSort = ctx.match[2] as TimeSort;
      const tradeType = ctx.match[4] as TradeTypeFilter;
  
      const nextTimeSort: TimeSort =
        timeSort === 'newest' ? 'oldest' : 'newest';
  
      await ctx.answerCallbackQuery();
  
      await showOrders(
        ctx,
        0,
        filter,
        nextTimeSort,
        'desc', 
        tradeType,
        true,
        'time',
      );
    },
  );

  ordersComposer.callbackQuery(
    /^ord:s:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL):(time|amount)$/,
    async (ctx) => {
      const filter = ctx.match[1] as OrderFilter;
      const timeSort = ctx.match[2] as TimeSort;
      const amountSort = ctx.match[3] as AmountSort;
      const tradeType = ctx.match[4] as TradeTypeFilter;
      const sortBy = ctx.match[5] as SortBy;

      await ctx.answerCallbackQuery();

      await showOrders(
        ctx,
        0,
        nextFilter(filter),
        timeSort,
        amountSort,
        tradeType,
        true,
        sortBy,
      );
    },
  );

  ordersComposer.callbackQuery(
    /^ord:a:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL):(time|amount)$/,
    async (ctx) => {
      const filter = ctx.match[1] as OrderFilter;
      const amountSort = ctx.match[3] as AmountSort;
      const tradeType = ctx.match[4] as TradeTypeFilter;
  
      const nextAmountSort: AmountSort =
        amountSort === 'desc' ? 'asc' : 'desc';
  
      await ctx.answerCallbackQuery();
  
      await showOrders(
        ctx,
        0,
        filter,
        'newest',
        nextAmountSort,
        tradeType,
        true,
        'amount',
      );
    },
  );

  ordersComposer.callbackQuery(
    /^ord:y:(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL):(time|amount)$/,
    async (ctx) => {
      const filter = ctx.match[1] as OrderFilter;
      const timeSort = ctx.match[2] as TimeSort;
      const amountSort = ctx.match[3] as AmountSort;
      const tradeType = ctx.match[4] as TradeTypeFilter;
      const sortBy = ctx.match[5] as SortBy;

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
        sortBy,
      );
    },
  );

  ordersComposer.callbackQuery(
    /^ord:p:(\d+):(all|in_progress|completed|cancelled|appeal|expired):(newest|oldest):(asc|desc):(all|BUY|SELL):(time|amount)$/,
    async (ctx) => {
      const page = Number(ctx.match[1]);
      const filter = ctx.match[2] as OrderFilter;
      const timeSort = ctx.match[3] as TimeSort;
      const amountSort = ctx.match[4] as AmountSort;
      const tradeType = ctx.match[5] as TradeTypeFilter;
      const sortBy = ctx.match[6] as SortBy;

      await ctx.answerCallbackQuery();

      await showOrders(
        ctx,
        page,
        filter,
        timeSort,
        amountSort,
        tradeType,
        true,
        sortBy,
      );
    },
  );

  ordersComposer.callbackQuery(/^ord:d:(.+)$/, async (ctx) => {
    const orderNumber = ctx.match[1];

    await ctx.answerCallbackQuery();

    const order =
      await ordersService.getOrderByNumber(orderNumber);

    if (!order) {
      await ctx.reply('Ордер не найден.');
      return;
    }

    await ctx.reply(formatOrderDetails(order), {
      parse_mode: 'HTML',
    });
  });

  return ordersComposer;
}