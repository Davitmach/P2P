import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { OrdersModule } from './orders.module';


async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      OrdersModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'orders',
          noAck: false,
          prefetchCount: 1,
          persistent: true,
          queueOptions: {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum',
            },
          },
        },
      },
    );

  await app.listen();
}

bootstrap();