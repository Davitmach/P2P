import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller()
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  getHello(): string {
    return this.marketService.getHello();
  }
}
