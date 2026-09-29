import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MerchantAdsRedisService } from './merchant-ads/merchant-ads.service';

@Global()
@Module({
  providers: [RedisService, MerchantAdsRedisService],
  exports: [RedisService,MerchantAdsRedisService],
})
export class RedisModule {}


