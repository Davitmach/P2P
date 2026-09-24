import { Controller, Get } from '@nestjs/common';
import { PriceReporterService } from './price-reporter.service';

@Controller()
export class PriceReporterController {
  constructor(private readonly priceReporterService: PriceReporterService) {}

  @Get()
  getHello(): string {
    return this.priceReporterService.getHello();
  }
}
