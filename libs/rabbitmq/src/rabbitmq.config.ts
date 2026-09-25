export const RABBITMQ_RETRY = {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 5000,
  } as const;
  
  export const RABBITMQ_QUEUES = {
    P2P_BOT: 'p2p-bot',
  
    MARKET: 'market',
  
    ORDERS: 'orders',
    ORDERS_RETRY: 'orders.retry',
    ORDERS_DLQ: 'orders.dlq',
  
    MERCHANT_ADS: 'merchant-ads',
    MERCHANT_ADS_RETRY: 'merchant-ads.retry',
    MERCHANT_ADS_DLQ: 'merchant-ads.dlq',
  
    PRICE_REPORTER: 'price-reporter',
    DAILY_REPORTS: 'daily-reports',
  } as const;   