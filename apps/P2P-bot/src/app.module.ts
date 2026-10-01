import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
import { RabbitmqModule } from '@app/rabbitmq';
import { BinanceModule } from '@app/binance';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramModule } from './telegram/telegram.module';
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
  TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
