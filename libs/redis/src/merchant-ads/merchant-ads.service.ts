import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { setCurrentPrices } from './merchant-ads.types';

@Injectable()
export class MerchantAdsRedisService {
  private readonly logger = new Logger('MerchandAdsRedis');
  constructor(private readonly redis: RedisService) {}
  getCurrentPrices() {
    try {
        return this.redis.get('current:prices')
    } catch (error) {
      this.logger.error(
        `Failed to set current prices`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
  setCurrentPrices(props: setCurrentPrices) {
    try {
        this.redis.set('current:prices',JSON.stringify(props))

        this.logger.log('Current prices successfully saved to Redis');
    } catch (error) {
      this.logger.error(
        `Failed to set current prices`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
}
