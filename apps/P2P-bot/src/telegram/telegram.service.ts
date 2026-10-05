import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { session } from 'grammy';
import { conversations } from '@grammyjs/conversations';
import { TelegramUserIdService } from '@app/redis';

import { bot } from './telegram.bot';
import { SessionData } from './types/session.types';
import { createMainComposer } from './composer';
import { createTelegramMiddleware } from './middlewares/telegram.middleware';
import { OrdersService } from './orders.service';
import { RatesService } from './rates.service';
import { setCommands } from './set-command';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    private readonly telegramUserIdService: TelegramUserIdService,
    private readonly ordersService: OrdersService,
    private readonly ratesService:RatesService
  ) {}

  async onModuleInit(): Promise<void> {
    bot.use(
      session({
        initial: (): SessionData => ({}),
      }),
    );
  
    bot.use(conversations());
  
    bot.use(createTelegramMiddleware(this.telegramUserIdService));
  
    bot.use(
      createMainComposer(
        this.ordersService,
        this.ratesService,
      ),
    );
  
    await setCommands(bot.api);
  
    void bot
      .start({
        onStart: (botInfo) => {
          this.logger.log(`Bot started: @${botInfo.username}`);
        },
      })
      .catch((error: unknown) => {
        this.logger.error(
          'Telegram polling failed',
          error instanceof Error ? error.stack : String(error),
        );
      });
  }

  onModuleDestroy(): void {
    bot.stop();
  }
}