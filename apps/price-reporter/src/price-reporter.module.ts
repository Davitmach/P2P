import { Module } from '@nestjs/common';
import { PriceReporterController } from './price-reporter.controller';
import { PriceReporterService } from './price-reporter.service';
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
  controllers: [PriceReporterController],
  providers: [PriceReporterService],
})
export class PriceReporterModule {}
