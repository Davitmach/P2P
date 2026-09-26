import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { PriceReporterModule } from './price-reporter.module';


async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      PriceReporterModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'price-reporter',
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