import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { DailyReportsModule } from './daily-reports.module';


async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      DailyReportsModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'daily-reports',
          noAck: false,
          prefetchCount: 1,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    );

  await app.listen();
}

bootstrap();