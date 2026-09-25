import { Module } from '@nestjs/common';
import { PriceReporterController } from './price-reporter.controller';
import { PriceReporterService } from './price-reporter.service';
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
  controllers: [PriceReporterController],
  providers: [PriceReporterService],
})
export class PriceReporterModule {}
