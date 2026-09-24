import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PriceReporterModule } from './price-reporter.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PriceReporterModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'price-reporter',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();