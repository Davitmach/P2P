import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
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
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
