import { InlineKeyboard } from 'grammy';

import type {
  AmountSort,
  OrderFilter,
  P2POrder,
  SortBy,
  TimeSort,
  TradeTypeFilter,
} from '../types/orders.types';

import { formatOrderButton } from '../messages/orders.messages';

const statusLabels: Record<OrderFilter, string> = {
  all: 'Все статусы',
  in_progress: 'В процессе',
  completed: 'Завершён',
  cancelled: 'Отменён',
  appeal: 'Апелляция',
  expired: 'Истёк',
};

export function ordersKeyboard(
  orders: P2POrder[],
  page: number,
  totalPages: number,
  filter: OrderFilter,
  timeSort: TimeSort,
  amountSort: AmountSort,
  tradeType: TradeTypeFilter,
  sortBy: SortBy = 'time',
): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  keyboard
    .text(
      `${timeSort === 'newest' ? '📅 Новые' : '📅 Старые'}`,
      `ord:t:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`,
    )
    .text(
      `📊 ${statusLabels[filter]}`,
      `ord:s:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`,
    )
    .text(
      `${amountSort === 'desc' ? '💰 Сумма ↓' : '💰 Сумма ↑'}`,
      `ord:a:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`,
    )
    .text(
      tradeType === 'all'
        ? '⇄ Тип: все'
        : tradeType === 'BUY'
          ? '🟢 Покупка'
          : '🔴 Продажа',
      `ord:y:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`,
    )
    .row();

  for (const order of orders) {
    keyboard
      .text(formatOrderButton(order), `ord:d:${order.orderNumber}`)
      .row();
  }

  keyboard
    .text(
      '← Назад',
      page > 0
        ? `ord:p:${page - 1}:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`
        : 'ord:n',
    )
    .text(`${page + 1} / ${totalPages}`, 'ord:n')
    .text(
      'Вперёд →',
      page + 1 < totalPages
        ? `ord:p:${page + 1}:${filter}:${timeSort}:${amountSort}:${tradeType}:${sortBy}`
        : 'ord:n',
    );

  return keyboard;
}