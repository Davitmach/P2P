import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
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
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
