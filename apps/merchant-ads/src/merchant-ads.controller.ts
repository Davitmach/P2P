import { Controller } from '@nestjs/common';
import { MerchantAdsService } from './merchant-ads.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Controller()
export class MerchantAdsController {
  constructor(private readonly merchantAdsService: MerchantAdsService) {}

  @Interval(5000)
  async fetchAds() {
       return this.merchantAdsService.savePrices('redis')
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async savePrices() {
    return this.merchantAdsService.savePrices('db')
}
}
