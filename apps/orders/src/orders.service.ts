import { BinanceClient } from '@app/binance';
import { Controller, Logger, Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(Controller.name);

  constructor(private readonly binance: BinanceClient) { }

  async fetchAds() {
    try {
      const [buyAds, sellAds] = await Promise.all([
        this.binance.searchAds({
          publisherType: 'merchant',
          fiat: 'AMD',
          asset: 'USDT',
          tradeType: 'BUY',
          page: 1,
          rows: 20
        }),

        this.binance.searchAds({
          publisherType: 'merchant',
          fiat: 'AMD',
          asset: 'USDT',
          tradeType: 'SELL',
          page: 1,
          rows: 20
        })
      ]);

      console.log(Array.isArray(buyAds));
      console.log(JSON.stringify(buyAds, null, 2));


    } catch (error) {
      this.logger.error(
        'Binance searchAds request failed',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }


}
