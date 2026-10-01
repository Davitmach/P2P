import { Logger } from '@nestjs/common';
import { Middleware } from 'grammy';
import { BotContext } from '../types/session.types';
import { TelegramUserIdService } from '@app/redis';

const logger = new Logger('TelegramMiddleware');

export const createTelegramMiddleware = (
  telegramUserIdService: TelegramUserIdService,
): Middleware<BotContext> => {
  return async (ctx, next) => {
    try {
      const telegramId = ctx.from?.id;

      if (telegramId) {
        await telegramUserIdService.setTelegramUserId(telegramId.toString());
      } else {
        const telegramUserId = await telegramUserIdService.getTelegramUserId();
        if (telegramUserId) {
          ctx.from!.id = parseInt(telegramUserId);
        }
      }

      await next();
    } catch (error) {
      logger.error(
        'Telegram middleware failed',
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  };
};