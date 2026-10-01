import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MerchantAdsRedisService } from './merchant-ads/merchant-ads.service';
import { TelegramUserIdService } from './telegram-user-id/telegram-user-id.service';

@Global()
@Module({
  providers: [RedisService, MerchantAdsRedisService, TelegramUserIdService],
  exports: [RedisService,MerchantAdsRedisService, TelegramUserIdService],
})
export class RedisModule {}


