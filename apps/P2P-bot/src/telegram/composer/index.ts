import { Composer } from 'grammy';

import type { BotContext } from '../types/session.types';
import { createStartComposer} from './start.composer';
import { createOrdersComposer } from './orders.composer';
import type { OrdersService } from '../orders.service';
import { createRatesComposer } from './rates.composer';
import { RatesService } from '../rates.service';
import { OrdersRedisService } from '@app/redis/orders/orders.service';


export function createMainComposer(
  ordersService: OrdersService,
  ratesService:RatesService,
  orderInProcessService:OrdersRedisService
): Composer<BotContext> {
  const mainComposer = new Composer<BotContext>();

  mainComposer.use(createStartComposer(orderInProcessService));
  mainComposer.use(createOrdersComposer(ordersService));
  mainComposer.use(createRatesComposer(ratesService))

  return mainComposer;
}