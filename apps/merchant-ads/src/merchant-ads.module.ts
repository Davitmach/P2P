import { Module } from '@nestjs/common';
import { MerchantAdsController } from './merchant-ads.controller';
import { MerchantAdsService } from './merchant-ads.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule
  ],
  controllers: [MerchantAdsController],
  providers: [MerchantAdsService],
})
export class MerchantAdsModule {}
