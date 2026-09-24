import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrdersModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'orders',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();