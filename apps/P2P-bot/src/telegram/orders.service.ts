import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import type { Prisma } from '@app/database';

import type {
  AmountSort,
  OrderFilter,
  P2POrder,
  SortBy,
  TimeSort,
  TradeTypeFilter,
} from './types/orders.types';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(
    page = 0,
    size = 6,
    filter: OrderFilter = 'all',
    timeSort: TimeSort = 'newest',
    amountSort: AmountSort = 'desc',
    tradeType: TradeTypeFilter = 'all',
    sortBy: SortBy = 'time',
  ): Promise<{
    orders: P2POrder[];
    total: number;
    totalPages: number;
    page: number;
  }> {
    const safeSize = Math.max(1, Math.min(size, 100));
    const safePage = Math.max(0, page);

    const where: Prisma.OrdersWhereInput = {
      ...(tradeType !== 'all' ? { type: tradeType } : {}),
      ...(filter === 'in_progress'
        ? { status: { in: [0, 1, 2, 3] } }
        : {}),
      ...(filter === 'completed' ? { status: 4 } : {}),
      ...(filter === 'cancelled' ? { status: 6 } : {}),
      ...(filter === 'appeal' ? { status: 5 } : {}),
      ...(filter === 'expired' ? { status: 7 } : {}),
    };

    const orderBy: Prisma.OrdersOrderByWithRelationInput[] =
      sortBy === 'time'
        ? [
            {
              orderCreateAt: timeSort === 'newest' ? 'desc' : 'asc',
            },
            { totalPrice: amountSort },
            { id: 'asc' },
          ]
        : [
            { totalPrice: amountSort },
            {
              orderCreateAt: timeSort === 'newest' ? 'desc' : 'asc',
            },
            { id: 'asc' },
          ];

    const [orders, total] = await Promise.all([
      this.prisma.orders.findMany({
        where,
        orderBy,
        skip: safePage * safeSize,
        take: safeSize,
      }),
      this.prisma.orders.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / safeSize));

    return {
      orders,
      total,
      totalPages,
      page: Math.min(safePage, totalPages - 1),
    };
  }

  async getOrderByNumber(
    orderNumber: string,
  ): Promise<P2POrder | null> {
    return this.prisma.orders.findUnique({
      where: { orderNumber },
    });
  }
}