import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { getCurrentPrices, setCurrentPrices } from './merchant-ads.types';

@Injectable()
export class MerchantAdsRedisService {
  private readonly logger = new Logger('MerchandAdsRedis');
  constructor(private readonly redis: RedisService) {}
  async getCurrentPrices(): Promise<getCurrentPrices | null> {
    try {
       const data =await  this.redis.get('current:prices')
        if (!data) {
          return null;
        }
        return JSON.parse(data) as getCurrentPrices;
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
      const data = {...props,date:new Date()}
         return this.redis.set('current:prices',JSON.stringify(data))
    } catch (error) {
      this.logger.error(
        `Failed to set current prices`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
}
