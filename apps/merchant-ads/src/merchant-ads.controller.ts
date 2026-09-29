import { Controller, Get } from '@nestjs/common';
import { MerchantAdsService } from './merchant-ads.service';
import { Interval } from '@nestjs/schedule';

@Controller()
export class MerchantAdsController {
  constructor(private readonly merchantAdsService: MerchantAdsService) {}

  @Interval(1000)
  async de() {

  }
}
