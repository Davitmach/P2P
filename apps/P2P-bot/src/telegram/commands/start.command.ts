import { startMessage } from '../messages/start.messages';
import { BotContext } from '../types/session.types';

export async function startCommand(ctx: BotContext) {
  await ctx.reply(startMessage(4),{
    parse_mode: 'HTML',
  });
}