import { Controller, Get } from '@nestjs/common';
import { DailyReportsService } from './daily-reports.service';

@Controller()
export class DailyReportsController {
  constructor(private readonly dailyReportsService: DailyReportsService) {}

  @Get()
  getHello(): string {
    return this.dailyReportsService.getHello();
  }
}
