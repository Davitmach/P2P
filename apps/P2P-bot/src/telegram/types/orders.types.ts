import type { Orders, OrderType } from '@app/database';

export type P2POrder = Orders;

export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OrderFilter =
  | 'all'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'appeal'
  | 'expired';

export type TimeSort = 'newest' | 'oldest';

export type AmountSort = 'asc' | 'desc';

export type TradeTypeFilter = 'all' | OrderType;

export type SortBy = 'time' | 'amount';