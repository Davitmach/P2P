import { Bot } from 'grammy';
import { BotContext } from './types/session.types';


const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not configured');
}

export const bot = new Bot<BotContext>(token);