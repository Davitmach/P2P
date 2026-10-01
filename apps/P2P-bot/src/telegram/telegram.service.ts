
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Bot, session } from 'grammy';
import {
  conversations,

} from '@grammyjs/conversations';

import { BotContext, SessionData } from './types/session.types';
import { mainComposer } from './composer';


@Injectable()
export class TelegramService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(TelegramService.name);
  private bot?: Bot<BotContext>;

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    this.bot = new Bot<BotContext>(token);


    this.bot.use(
      session({
        initial: (): SessionData => ({}),
      }),
    );

    this.bot.use(conversations());


    this.bot.use(mainComposer);

    void this.bot.start({
      onStart: (botInfo) => {
        this.logger.log(`Bot started: @${botInfo.username}`);
      },
    }).catch((error: unknown) => {
      this.logger.error(
        'Telegram polling failed',
        error instanceof Error ? error.stack : String(error),
      );
    });
  }

  onModuleDestroy() {
    this.bot?.stop();
  }
}
