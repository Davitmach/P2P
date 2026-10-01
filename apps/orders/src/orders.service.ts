import { BinanceClient } from '@app/binance';
import { PrismaService } from '@app/database';
import { Controller, Logger, Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(Controller.name);

  constructor(
    private readonly binance: BinanceClient,
    private readonly prismaService: PrismaService
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

        } catch(error) {
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


}
