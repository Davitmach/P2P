import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_QUEUES } from './rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_QUEUES.P2P_BOT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.P2P_BOT,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: RABBITMQ_QUEUES.MARKET,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.MARKET,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: RABBITMQ_QUEUES.ORDERS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.ORDERS,
          persistent: true,
          queueOptions: {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum',
              'x-delivery-limit': 3,
              'x-dead-letter-exchange': '',
              'x-dead-letter-routing-key':
                RABBITMQ_QUEUES.ORDERS_DLQ,
              'x-delayed-retry-type': 'failed',
              'x-delayed-retry-min': 5000,
              'x-delayed-retry-max': 15000,
            },
          },
        },
      },
      {
        name: RABBITMQ_QUEUES.MERCHANT_ADS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.MERCHANT_ADS,
          persistent: true,
          queueOptions: {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum',
              'x-delivery-limit': 3,
              'x-dead-letter-exchange': '',
              'x-dead-letter-routing-key':
                RABBITMQ_QUEUES.MERCHANT_ADS_DLQ,
              'x-delayed-retry-type': 'failed',
              'x-delayed-retry-min': 5000,
              'x-delayed-retry-max': 15000,
            },
          },
        },
      },
      {
        name: RABBITMQ_QUEUES.PRICE_REPORTER,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.PRICE_REPORTER,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: RABBITMQ_QUEUES.DAILY_REPORTS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: RABBITMQ_QUEUES.DAILY_REPORTS,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitmqModule {}