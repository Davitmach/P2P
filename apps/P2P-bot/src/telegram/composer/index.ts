import { Composer } from 'grammy';
import { BotContext } from '../types/session.types';
import { startComposer } from './start.composer';
import { ordersComposer } from './orders.composer';

export const mainComposer = new Composer<BotContext>();

mainComposer.use(startComposer);
mainComposer.use(ordersComposer);