import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RedisService } from '@app/redis';
@Controller()
export class OrdersController {
  constructor(
    private readonly redisService: RedisService,
  ) {}
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