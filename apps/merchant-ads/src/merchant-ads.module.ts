import { Module } from '@nestjs/common';
import { MerchantAdsController } from './merchant-ads.controller';
import { MerchantAdsService } from './merchant-ads.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MerchantAdsController],
  providers: [MerchantAdsService],
})
export class MerchantAdsModule {}
