import { Composer } from 'grammy';

import type { BotContext } from '../types/session.types';
import { startComposer } from './start.composer';
import { createOrdersComposer } from './orders.composer';
import type { OrdersService } from '../orders.service';

export function createMainComposer(
  ordersService: OrdersService,
): Composer<BotContext> {
  const mainComposer = new Composer<BotContext>();

  mainComposer.use(startComposer);
  mainComposer.use(createOrdersComposer(ordersService));

  return mainComposer;
}