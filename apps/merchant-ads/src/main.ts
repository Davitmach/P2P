import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MerchantAdsModule } from './merchant-ads.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MerchantAdsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'merchant-ads',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();