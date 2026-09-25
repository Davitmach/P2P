const amqp = require('amqplib');

const url = process.env.RABBITMQ_URL;

const queues = {
  orders: {
    type: 'quorum',
    retry: 'orders.retry',
    dlq: 'orders.dlq',
  },

  'merchant-ads': {
    type: 'quorum',
    retry: 'merchant-ads.retry',
    dlq: 'merchant-ads.dlq',
  },
};

async function main() {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  for (const [queue, config] of Object.entries(queues)) {
    await channel.assertQueue(queue, {
      durable: true,
      arguments: {
        'x-queue-type': config.type,
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': config.retry,
      },
    });

    await channel.assertQueue(config.retry, {
      durable: true,
      arguments: {
        'x-message-ttl': 5000,
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': queue,
      },
    });

    await channel.assertQueue(config.dlq, {
      durable: true,
    });
  }

  await channel.assertQueue('p2p-bot', {
    durable: true,
  });

  await channel.assertQueue('market', {
    durable: true,
  });

  await channel.assertQueue('price-reporter', {
    durable: true,
  });

  await channel.assertQueue('daily-reports', {
    durable: true,
  });

  console.log('RabbitMQ topology initialized');

  await channel.close();
  await connection.close();
}

main().catch((error) => {
  console.error('RabbitMQ initialization failed:', error);
  process.exit(1);
});