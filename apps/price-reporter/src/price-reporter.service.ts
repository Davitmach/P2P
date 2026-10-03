import { RABBITMQ_QUEUES } from '@app/rabbitmq';
import { MerchantAdsRedisService, TelegramUserIdService } from '@app/redis';
import { Controller, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PriceReporterService {
  private readonly logger = new Logger(Controller.name);
  constructor(
    private readonly redisMerchantAds: MerchantAdsRedisService,
    private readonly redisUserId: TelegramUserIdService,
    @Inject(RABBITMQ_QUEUES.P2P_BOT)
    private readonly p2pClient: ClientProxy,
  ) {}

  async priceReport() {
    try {
      const prices = await this.redisMerchantAds.getCurrentPrices();
      const chatId = await this.redisUserId.getTelegramUserId();

      if (!chatId) {
        this.logger.warn('Telegram user ID not found in Redis');
        return;
      }

      const payload = {
        chatId: chatId.toString(),
        data: prices,
      };

      this.logger.log(`Sending notification: ${JSON.stringify(payload)}`);

      this.p2pClient.emit('telegram.price.notification', payload);
    } catch (error) {
      this.logger.error(
        'Price report failed',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
