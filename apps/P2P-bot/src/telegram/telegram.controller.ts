import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { PriceNotificationService } from './price-notification.service';
import type { TelegramPriceNotification } from './types/telegram.types';

@Controller()
export class TelegramController {
  private readonly logger = new Logger(TelegramController.name);

  constructor(
    private readonly priceNotificationService: PriceNotificationService,
  ) {}

  @EventPattern('telegram.price.notification')
  async handlePriceNotification(
    @Payload() data: TelegramPriceNotification,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.priceNotificationService.sendPriceReport(
        data.chatId,
        data.data,
      );

      channel.ack(message);
    } catch (error) {
      this.logger.error(
        'Failed to send price notification',
        error instanceof Error ? error.stack : String(error),
      );

      channel.reject(message, false);
    }
  }
}