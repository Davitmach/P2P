import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DailyReportsModule } from './daily-reports.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DailyReportsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'daily-reports',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();