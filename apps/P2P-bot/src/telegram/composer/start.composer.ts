import { Composer } from 'grammy';
import { BotContext } from '../types/session.types';
import { startCommand } from '../commands/start.command';

export const startComposer = new Composer<BotContext>();

startComposer.command('start', startCommand);