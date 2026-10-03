import { Controller } from '@nestjs/common';
import { PriceReporterService } from './price-reporter.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class PriceReporterController {
  constructor(private readonly priceReporterService: PriceReporterService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  priceReport() {
    return this.priceReporterService.priceReport()
  }
}
