import type { P2POrder } from '../types/orders.types';

export function formatOrderButton(order: P2POrder): string {
  const type = order.type === 'BUY' ? '🟢 BUY' : '🔴 SELL';

  return `${type} | ${order.orderNumber} | ${order.totalPrice.toString()} ${order.fiatSymbol}`;
}

export function formatOrdersList(
  _orders: P2POrder[],

): string {
  return [
    '📋 <b>P2P ордера</b>',
  
  ].join('\n');
}

export function formatOrderDetails(order: P2POrder): string {
  const statusMap: Record<number, string> = {
    0: '🟡 Ожидает оплаты',
    1: '💳 Ожидает подтверждения',
    2: '🔄 В обработке',
    3: '⏳ Ожидает завершения',
    4: '✅ Завершён',
    5: '⚠️ Апелляция',
    6: '❌ Отменён',
    7: '⌛ Истёк',
  };

  const typeLabel = order.type === 'BUY' ? '🟢 Покупка' : '🔴 Продажа';

  return [
    '📄 <b>ОРДЕР</b>',
    '━━━━━━━━━━━━━━━━━━',
    `🔖 <b>Номер:</b> <code>${order.orderNumber}</code>`,
    `📌 <b>Тип:</b> ${typeLabel}`,
    '',
    '💰 <b>ДЕТАЛИ СДЕЛКИ</b>',
    `🪙 Актив: <b>${order.asset}</b>`,
    `💵 Количество: <b>${order.amount.toString()} ${order.asset}</b>`,
    `🏦 Фиат: <b>${order.fiat}</b>`,
    `💳 Сумма: <b>${order.totalPrice.toString()} ${order.fiatSymbol}</b>`,
    '',
    '📊 <b>ИНФОРМАЦИЯ</b>',
    `Статус: ${statusMap[order.status] ?? `❔ ${order.status}`}`,
    `🕒 Создан: ${order.orderCreateAt.toLocaleString('ru-RU')}`,
    '',
    '👥 <b>УЧАСТНИКИ</b>',
    `🟢 Покупатель: ${order.buyerNickname ?? '—'}`,
    `🔴 Продавец: ${order.sellerNickname ?? '—'}`,
    '━━━━━━━━━━━━━━━━━━',
  ].join('\n');
}