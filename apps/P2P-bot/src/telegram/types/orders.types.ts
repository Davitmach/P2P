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
export type TradeTypeFilter = 'all' | 'BUY' | 'SELL';

export interface P2POrder {
  orderNumber: string;
  tradeType: 'BUY' | 'SELL';
  asset: string;
  fiat: string;
  fiatSymbol: string;
  amount: string;
  totalPrice: string;
  orderStatus: OrderStatus;
  createTime: number;
  notifyPayEndTime?: number;
  confirmPayEndTime?: number;
  buyerNickname: string;
  sellerNickname: string;
  takerCommissionRate: string;
  takerCommission: string;
  takerAmount: string;
}