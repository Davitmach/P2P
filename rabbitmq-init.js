const amqp = require('amqplib');

const url = process.env.RABBITMQ_URL;

const queues = {
  orders: {
    type: 'quorum',
    dlq: 'orders.dlq',
    deliveryLimit: 3,
  },

  'merchant-ads': {
    type: 'quorum',
    dlq: 'merchant-ads.dlq',
    deliveryLimit: 3,
  },
};

async function main() {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  for (const [queue, config] of Object.entries(queues)) {
    await channel.assertQueue(config.dlq, {
      durable: true,
    });

    await channel.assertQueue(queue, {
      durable: true,
      arguments: {
        'x-queue-type': config.type,

        'x-delivery-limit': config.deliveryLimit,

        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': config.dlq,
      },
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