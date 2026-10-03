import { Module } from '@nestjs/common';

import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { PriceNotificationService } from './price-notification.service';

@Module({
  controllers: [TelegramController],
  providers: [
    TelegramService,
    PriceNotificationService,
  ],
  exports: [TelegramService],
})
export class TelegramModule {}