import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MarketModule } from './market.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MarketModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'market',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();