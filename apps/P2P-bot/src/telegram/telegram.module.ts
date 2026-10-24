import { Module } from '@nestjs/common';

import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { PriceNotificationService } from './price-notification.service';
import { OrdersService } from './orders.service';
import { DatabaseModule } from '@app/database';
import { RatesService } from './rates.service';
import { OrdersRedisService } from '@app/redis/orders/orders.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TelegramController],
  providers: [
    TelegramService,
    PriceNotificationService,
    OrdersService,
    RatesService,
    OrdersRedisService
  ],
  exports: [TelegramService],
})
export class TelegramModule {}