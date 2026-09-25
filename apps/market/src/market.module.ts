import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
