import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_QUEUES } from '@app/rabbitmq';
import { BinanceClient } from '@app/binance';
import { MerchantAdsRedisService } from '@app/redis';
@Controller()
export class AppController {
  private readonly logger = new Logger(Controller.name)
  constructor(
    @Inject(RABBITMQ_QUEUES.ORDERS)
    private readonly ordersClient: ClientProxy,
    private readonly binance:BinanceClient,
    private readonly redisMerchantAds:MerchantAdsRedisService

   
  ) {}

  @Get('test-rabbitmq')
  async testRabbitMQ() {
    const message = {
      type: 'TEST',
      orderNumber: `TEST-${Date.now()}`,
      message: 'Hello from P2P-bot',
      createdAt: new Date().toISOString(),
    };

    await this.ordersClient.emit('orders.test', message).toPromise();

    return {
      success: true,
      message,
    };
  }
  @Get('test-binance')
  async testBinance() {
    try {
      return await this.redisMerchantAds.getCurrentPrices()
    } catch (error) {
      this.logger.error(
        'Binance searchAds request failed',
        error instanceof Error ? error.stack : String(error),
      );
  
     return {message:'error'}
    }
  }

}