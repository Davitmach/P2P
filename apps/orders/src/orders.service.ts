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
      const orders = response.data
      const orderNumbers = orders.map(order => order.orderNumber);

      const existingOrders = await this.prismaService.orders.findMany({
        where: {
          orderNumber: {
            in: orderNumbers
          }
        },
        select: {
          orderNumber: true,
        },
      });

      const existingOrdersNumbers = new Set(
        existingOrders.map(order => order.orderNumber)
      )

      for (const order of orders) {
        if (existingOrdersNumbers.has(order.orderNumber)) {
          await this.prismaService.orders.update({
            where: {
              orderNumber: order.orderNumber,
            },
            data: {
              status: order.orderStatus,
            }
          })
          
          continue;
        }

        await this.prismaService.orders.create({
          data: {
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
        })
      }

    } catch (error) {
      this.logger.error(
        'Binance searchAds request failed',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }


}
