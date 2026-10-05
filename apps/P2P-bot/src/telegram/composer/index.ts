import { Composer } from 'grammy';

import type { BotContext } from '../types/session.types';
import { startComposer } from './start.composer';
import { createOrdersComposer } from './orders.composer';
import type { OrdersService } from '../orders.service';
import { createRatesComposer } from './rates.composer';
import { RatesService } from '../rates.service';


export function createMainComposer(
  ordersService: OrdersService,
  ratesService:RatesService
): Composer<BotContext> {
  const mainComposer = new Composer<BotContext>();

  mainComposer.use(startComposer);
  mainComposer.use(createOrdersComposer(ordersService));
  mainComposer.use(createRatesComposer(ratesService))

  return mainComposer;
}