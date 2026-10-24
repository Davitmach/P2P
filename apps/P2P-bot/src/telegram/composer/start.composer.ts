import { Composer } from 'grammy';
import type { BotContext } from '../types/session.types';

import { createStartCommand } from '../commands/start.command';
import { OrdersRedisService } from '@app/redis/orders/orders.service';

export function createStartComposer(
  ordersRedisService: OrdersRedisService,
) {
  const composer = new Composer<BotContext>();

  composer.command(
    'start',
    createStartCommand(ordersRedisService),
  );

  return composer;
}