import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { BinanceOrder } from '@app/binance';

@Injectable()
export class OrdersRedisService {
    private readonly logger = new Logger('OrdersRedis');

    constructor(
        private readonly redis: RedisService,
    ) {}

    async setOrdersInProcess(count: number): Promise<void> {
        try {
            await this.redis.set(
                'current:orders-in-process',
                String(count)
            );

        } catch (error) {
            this.logger.error(
                `Failed to set a number of orders in process into Redis`,
                error instanceof Error ? error.stack : String(error)
            )
            throw error;
        }
    }

    async getOrdersInProcess(): Promise<number | null> {
        try {
            const data = await this.redis.get("current:orders-in-process");
            if(!data) {
                return null;
            }

            return Number(data);

        } catch (error) {
            this.logger.error(
                `Failed to get a number of orders in process from Redis`,
                error instanceof Error ? error.stack : String(error)
            );

            throw error;
        }
    }
}
