import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { OrdersModule } from './orders.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: 'orders',
        noAck: false,
        prefetchCount: 1,
        persistent: true,
        maxConnectionAttempts: -1,
        queueOptions: {
          durable: true,
          arguments: {
            'x-queue-type': 'quorum',
            'x-delivery-limit': 3,
            'x-dead-letter-exchange': '',
            'x-dead-letter-routing-key': 'orders.dlq',
            'x-delayed-retry-type': 'failed',
            'x-delayed-retry-min': 5000,
            'x-delayed-retry-max': 15000,
          },
        },
      },
    },
  );

  await app.listen();
}

bootstrap();