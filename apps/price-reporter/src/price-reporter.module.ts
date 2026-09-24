import { Module } from '@nestjs/common';
import { PriceReporterController } from './price-reporter.controller';
import { PriceReporterService } from './price-reporter.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PriceReporterController],
  providers: [PriceReporterService],
})
export class PriceReporterModule {}
