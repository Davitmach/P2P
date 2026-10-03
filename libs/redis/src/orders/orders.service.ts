import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { BinanceOrder } from '@app/binance';

@Injectable()
export class OrdersRedisService {
    private readonly logger = new Logger('OrdersRedis');

    constructor(
        private readonly redis: RedisService,
    ) { }

    private buildOrderKey(orderNumber: string) {
        return `order:${orderNumber}`
    }

    async setOrder(order: BinanceOrder): Promise<void> {
        try {
            const key = this.buildOrderKey(order.orderNumber);

            await this.redis.set(
                key,
                JSON.stringify(order)
            );

        } catch (error) {
            this.logger.error(
                `Failed to set an order ${order.orderNumber} into Redis`,
                error instanceof Error ? error.stack : String(error)
            )
            throw error;
        }
    }

    // * orderNumber is like "order:{orderNumber}"
    async getOrder(orderNumber: string): Promise<BinanceOrder | null> {
        try {
            const key = this.buildOrderKey(orderNumber)
            const data = await this.redis.get(key);
            if(data === null) {
                return null;
            }
            return JSON.parse(data);

        } catch (error) {
            this.logger.error(
                `Failed to get order ${orderNumber} from Redis`,
                error instanceof Error ? error.stack : String(error)
            );

            throw error;
        }
    }
}
