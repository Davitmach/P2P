import { Injectable, Logger } from '@nestjs/common';
import { PrismaService, Prices } from '@app/database';
import { MerchantAdsRedisService } from '@app/redis';
import { getCurrentPrices } from '@app/redis/merchant-ads/merchant-ads.types';

@Injectable()
export class RatesService {
  private readonly logger = new Logger(RatesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: MerchantAdsRedisService,
  ) {}

  async getLastHourRate(): Promise<Prices | null> {
    try {
      const targetTime = new Date(Date.now() - 60 * 60 * 1000);

      const price = await this.prisma.prices.findFirst({
        where: {
          createdAt: {
            lte: targetTime,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return price;
    } catch (error) {
      this.logger.error(
        'Failed to get last hour price',
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }

  async getCurrentRate(): Promise<getCurrentPrices | null> {
    try {
      return await this.redis.getCurrentPrices();
    } catch (error) {
      this.logger.error(
        'Failed to get current prices',
        error instanceof Error ? error.stack : String(error),
      );
  
      throw error;
    }
  }
}