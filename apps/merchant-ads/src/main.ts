import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { MerchantAdsModule } from './merchant-ads.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MerchantAdsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: 'merchant-ads',
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
            'x-dead-letter-routing-key': 'merchant-ads.dlq',
            'x-delayed-retry-type': 'failed',
            'x-delayed-retry-min': 5000,
            'x-delayed-retry-max': 15000,
          },
        },
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
}

bootstrap();