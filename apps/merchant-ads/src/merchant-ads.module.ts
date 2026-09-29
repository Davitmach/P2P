import { Module } from '@nestjs/common';
import { MerchantAdsController } from './merchant-ads.controller';
import { MerchantAdsService } from './merchant-ads.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
import { RabbitmqModule } from '@app/rabbitmq';
import { BinanceModule } from '@app/binance';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule,
    RabbitmqModule,
    BinanceModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [MerchantAdsController],
  providers: [MerchantAdsService],
})
export class MerchantAdsModule {}
