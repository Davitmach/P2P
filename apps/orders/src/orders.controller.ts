import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  @EventPattern('orders.test')
  async handleTestMessage(
    @Payload() data: unknown,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    this.logger.log(
      `Received message: ${JSON.stringify(data)}`,
    );

    channel.ack(message);

    this.logger.log('Message ACKed');
  }
}