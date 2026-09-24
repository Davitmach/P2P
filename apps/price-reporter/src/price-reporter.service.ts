import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceReporterService {
  getHello(): string {
    return 'Hello World!';
  }
}
