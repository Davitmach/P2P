import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { MerchantAdsModule } from './merchant-ads.module';


async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      MerchantAdsModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'merchant-ads',
          noAck: false,
          prefetchCount: 1,
          persistent: true,
          queueOptions: {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum',
              'x-dead-letter-exchange': '',
              'x-dead-letter-routing-key': 'merchant-ads.retry',
            },
          },
        },
      },
    );

  await app.listen();
}

bootstrap();