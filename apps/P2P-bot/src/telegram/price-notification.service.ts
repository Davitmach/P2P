import { Injectable, Logger } from '@nestjs/common';

import { bot } from './telegram.bot';
import { priceReport } from './messages/price-reporter.message';
import type { PriceReportData } from './types/telegram.types';

@Injectable()
export class PriceNotificationService {
  private readonly logger = new Logger(PriceNotificationService.name);

  async sendPriceReport(
    chatId: string,
    data: PriceReportData,
  ): Promise<void> {
    const id = Number(chatId);

    if (!Number.isSafeInteger(id)) {
      throw new Error(`Invalid Telegram chatId: ${chatId}`);
    }
    const text = priceReport(data);

    await bot.api.sendMessage(id, text, {
      parse_mode: 'HTML',
    });

    this.logger.log(`Price report sent to ${chatId}`);
  }
}