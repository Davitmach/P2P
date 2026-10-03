import { BinanceClient } from '@app/binance';
import { PrismaService } from '@app/database';
import { OrdersRedisService } from '@app/redis/orders/orders.service';
import { Controller, Logger, Injectable } from '@nestjs/common';

const ORDERS_IN_PROCESS = [0, 1, 2, 3];

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(Controller.name);

  constructor(
    private readonly binance: BinanceClient,
    private readonly prismaService: PrismaService,
    private readonly redisOrders: OrdersRedisService
  ) { }

  async fetchOrders() {
    try {
      const response = await this.binance.listOrders();

      for (const order of response.data) {
        const data = {
          orderNumber: order.orderNumber,
          type: order.tradeType,
          asset: order.asset,
          fiat: order.fiat,
          fiatSymbol: order.fiatSymbol,
          amount: order.amount,
          totalPrice: order.totalPrice,
          status: order.orderStatus,
          orderCreateAt: new Date(order.createTime),
          confirmPayEndAt: order.confirmPayEndTime ?
            new Date(order.confirmPayEndTime) :
            null,
          notifyPayEndAt: order.notifyPayEndTime ?
            new Date(order.notifyPayEndTime) :
            null,
          buyerNickname: order.buyerNickname,
          sellerNickname: order.sellerNickname,
          takerCommissionRate: order.takerCommissionRate,
          takerCommission: order.takerCommission,
          takerAmount: order.takerAmount,
          advNumber: order.advNo
        }

        try {
          await this.prismaService.orders.upsert({
            where: { orderNumber: order.orderNumber },
            create: data,
            update: data,
          });

        } catch (error) {
          this.logger.error(
            `Failed to save order ${order.orderNumber}`,
            error instanceof Error ? error.stack : String(error),
          );
        }
      }

    } catch (error) {
      this.logger.error(
        'Binance orders fetch failed',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async countOrdersInProcess(): Promise<number> {
    return this.prismaService.orders.count({
      where: {
        status: {
          in: ORDERS_IN_PROCESS,
        }
      }
    });
  }

  async updateOrdersInProcess(): Promise<void> {
    const count = await this.countOrdersInProcess();

    try {
      await this.redisOrders.setOrdersInProcess(count);
    } catch (error) {
      this.logger.warn(`Count ${count} was not saved to Redis, continuing`)
    }
  }

  async getCountOrders(): Promise<number> {
    try {
      const cached = await this.redisOrders.getOrdersInProcess();

      if (cached !== null) {
        return cached;
      }

    } catch (error) {
      this.logger.warn('Redis unavailable, falling back to Postgres');
    }

    return this.countOrdersInProcess();
  }
}
