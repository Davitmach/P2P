import { BinanceClient } from '@app/binance';
import { MerchantAdsRedisService } from '@app/redis';
import { Controller, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MerchantAdsService {
  private readonly logger = new Logger(Controller.name);
  constructor(private readonly binance: BinanceClient,
    private readonly redisMerchantAds:MerchantAdsRedisService
  ) {}

  
  private average(numbers: number[]) {
    return Number(
      (numbers.reduce((sum, n) => sum + n, 0) / numbers.length).toFixed(2),
    );
  }

  async fetchAds() {
   
    try {
      
      const [sellAds, buyAds] = await Promise.all([
        this.binance.searchAds({
          publisherType: 'merchant',
          fiat: 'AMD',
          asset: 'USDT',
          tradeType: 'BUY',
          page: 1,
          rows: 20,
        }),
        this.binance.searchAds({
          publisherType: 'merchant',
          fiat: 'AMD',
          asset: 'USDT',
          tradeType: 'SELL',
          page: 1,
          rows: 20,
        }),
      ]);
 
      const buyPrices = buyAds.data.map((ad) => Number(ad.adv.price));
      const sellPrices = sellAds.data.map((ad) => Number(ad.adv.price));
      const maxBuyPrice = Math.max(...buyPrices);
      const minBuyPrice = Math.min(...buyPrices);
      const maxSellPrice = Math.max(...sellPrices);
      const minSellPrice = Math.min(...sellPrices);
      const averageBuyPrice = this.average(buyPrices);
      const averageSellPrice = this.average(sellPrices);


      this.logger.log('Максимум покупок', maxBuyPrice);
      this.logger.log('Минимум покупок', minBuyPrice);
      this.logger.log('Среднее покупок', averageBuyPrice);
      this.logger.log('Максимум продаж', maxSellPrice);
      this.logger.log('Минимум продаж', minSellPrice);
      this.logger.log('Среднее продаж', averageSellPrice);
      this.redisMerchantAds.setCurrentPrices({
        buy:{
          avg:averageBuyPrice,
          min:minBuyPrice,
          max:maxBuyPrice
        },
        sell:{
          avg:averageSellPrice,
          min:minSellPrice,
          max:maxSellPrice
        }
      })
    } catch (error) {
      this.logger.error(
        'Binance searchAds request failed',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
