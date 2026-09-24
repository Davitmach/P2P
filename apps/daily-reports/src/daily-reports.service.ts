import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyReportsService {
  getHello(): string {
    return 'Hello World!';
  }
}
