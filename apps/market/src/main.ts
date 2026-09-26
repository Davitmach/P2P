import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { MarketModule } from './market.module';


async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      MarketModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'market',
          noAck: false,
          prefetchCount: 1,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    );
    app.enableShutdownHooks();
  await app.listen();
}

bootstrap();