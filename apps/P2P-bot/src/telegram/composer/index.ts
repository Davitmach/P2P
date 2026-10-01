import { Composer } from 'grammy';
import { BotContext } from '../types/session.types';
import { startComposer } from './start.composer';

export const mainComposer = new Composer<BotContext>();

mainComposer.use(startComposer);