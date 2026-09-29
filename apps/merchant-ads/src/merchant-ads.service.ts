import { BinanceClient } from '@app/binance';
import { Controller, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MerchantAdsService {
  private readonly logger = new Logger(Controller.name);
  constructor(private readonly binance: BinanceClient) {}

  private average(numbers: number[]) {
     return Number((numbers.reduce((sum, n) => sum + n, 0)/numbers.length).toFixed(2))
  }
  async fetchAds() {
    try {
      const [buyAds, sellAds] = await Promise.all([
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
      
   var buyPrices= buyAds.data.map(ad=> Number(ad.adv.price))
   var sellPrices = sellAds.data.map(ad=>Number(ad.adv.price))
   const averageBuyPrice = this.average(buyPrices)
  const averageSellPrice = this.average(sellPrices)
   this.logger.log('Максимум покупок',Math.max(...buyPrices))
   this.logger.log('Минимум покупок',Math.min(...buyPrices))
   this.logger.log('Среднее покупок',averageBuyPrice)
   this.logger.log('Максимум продаж',Math.max(...sellPrices))
   this.logger.log('Минимум продаж',Math.min(...sellPrices))
   this.logger.log('Среднее продаж',averageSellPrice)

    }
    catch(error) {
      this.logger.error(
        'Binance searchAds request failed',
        error instanceof Error ? error.stack : String(error),
      );
  
    }
  }
}
