import { Module } from '@nestjs/common';
import { MerchantAdsController } from './merchant-ads.controller';
import { MerchantAdsService } from './merchant-ads.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule
  ],
  controllers: [MerchantAdsController],
  providers: [MerchantAdsService],
})
export class MerchantAdsModule {}
