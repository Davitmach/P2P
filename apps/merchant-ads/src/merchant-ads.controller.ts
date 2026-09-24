import { Controller, Get } from '@nestjs/common';
import { MerchantAdsService } from './merchant-ads.service';

@Controller()
export class MerchantAdsController {
  constructor(private readonly merchantAdsService: MerchantAdsService) {}

  @Get()
  getHello(): string {
    return this.merchantAdsService.getHello();
  }
}
