import {
    OrderFilter,
    OrderStatus,
    P2POrder,
  } from '../types/orders.types';
  
  const statuses: Record<OrderStatus, string> = {
    0: 'Обрабатывается',
    1: 'Ожидает оплаты',
    2: 'Ожидает подтверждения оплаты',
    3: 'Перевод выполняется',
    4: 'Завершён',
    5: 'Апелляция',
    6: 'Отменён',
    7: 'Истёк',
  };
  
  export const filterTitles: Record<OrderFilter, string> = {
    all: 'Все статусы',
    in_progress: 'В процессе',
    completed: 'Завершён',
    cancelled: 'Отменён',
    appeal: 'Апелляция',
    expired: 'Истёк',
  };
  
  function formatMoney(value: string | number): string {
    return Number(value).toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  
  function formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Yerevan',
    }).format(new Date(timestamp));
  }
  
  function escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  
  export function formatOrdersList(): string {
    return '📑 <b>ИСТОРИЯ P2P-СДЕЛОК</b>';
  }
  
  export function formatOrderButton(order: P2POrder): string {
    const icon = order.tradeType === 'SELL' ? '🔴' : '🟢';
  
    return `${icon} ${formatMoney(order.amount)} ${order.asset}  ·  ${formatMoney(order.totalPrice)} AMD`;
  }
  
  export function formatOrderDetails(order: P2POrder): string {
    const isSell = order.tradeType === 'SELL';
  
    const lines = [
      '━━━━━━━━━━━━━━━━━━',
      '       <b>BLACK CAPITAL</b>',
      '      <b>P2P ORDER DETAILS</b>',
      '━━━━━━━━━━━━━━━━━━',
      '',
      '▎ <b>ОРДЕР</b>',
      `Номер: <code>${escapeHtml(order.orderNumber)}</code>`,
      `Тип: <b>${isSell ? '🔴 Продажа' : '🟢 Покупка'}</b>`,
      `Статус: <b>${statuses[order.orderStatus]}</b>`,
      `Создан: ${formatTime(order.createTime)}`,
      '',
      '▎ <b>ФИНАНСЫ</b>',
      `Актив: <b>${escapeHtml(order.asset)}</b>`,
      `Количество: <b>${formatMoney(order.amount)} ${escapeHtml(order.asset)}</b>`,
      `Сумма: <b>${formatMoney(order.totalPrice)} ${escapeHtml(order.fiat)}</b>`,
      `Комиссия: <b>${formatMoney(order.takerCommission)} ${escapeHtml(order.asset)}</b>`,
      `Ставка: <b>${escapeHtml(order.takerCommissionRate)}%</b>`,
      `Итого с комиссией: <b>${formatMoney(order.takerAmount)} ${escapeHtml(order.asset)}</b>`,
      '',
      '▎ <b>УЧАСТНИКИ</b>',
      `Покупатель: <code>${escapeHtml(order.buyerNickname)}</code>`,
      `Продавец: <code>${escapeHtml(order.sellerNickname)}</code>`,
    ];
  
    if (order.notifyPayEndTime) {
      lines.push(`Срок оплаты: ${formatTime(order.notifyPayEndTime)}`);
    }
  
    if (order.confirmPayEndTime) {
      lines.push(`Срок подтверждения: ${formatTime(order.confirmPayEndTime)}`);
    }
  
    lines.push('', '━━━━━━━━━━━━━━━━━━', '<i>BLACK CAPITAL · P2P TERMINAL</i>');
  
    return lines.join('\n');
  }