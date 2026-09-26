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

    try {
      this.logger.log(
        `Received message: ${JSON.stringify(data)}`,
      );


      throw new Error('TEST RETRY ERROR');


    } catch (error) {
      this.logger.error(
        `Processing failed: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`,
      );

      channel.reject(message, false);
    }
  }
}