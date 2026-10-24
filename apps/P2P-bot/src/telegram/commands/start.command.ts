import type { BotContext } from '../types/session.types';

import { startMessage } from '../messages/start.messages';
import { OrdersRedisService } from '@app/redis/orders/orders.service';

export function createStartCommand(
  ordersRedisService: OrdersRedisService,
) {
  return async (ctx: BotContext): Promise<void> => {
    const ordersCount =
      await ordersRedisService.getOrdersInProcess();

    await ctx.reply(startMessage(ordersCount ?? 0), {
      parse_mode: 'HTML',
    });
  };
}