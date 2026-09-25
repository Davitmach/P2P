import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_QUEUES } from '@app/rabbitmq';

@Controller()
export class AppController {
  constructor(
    @Inject(RABBITMQ_QUEUES.ORDERS)
    private readonly ordersClient: ClientProxy,
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
}