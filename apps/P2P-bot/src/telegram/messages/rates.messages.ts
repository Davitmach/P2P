interface RateData {
  max: number;
  avg: number;
  min: number;

  maxPercent?: number;
  avgPercent?: number;
  minPercent?: number;
}

interface RatesMessageData {
  date: Date;
  asset: string;
  fiat: string;

  sell: RateData;
  buy: RateData;
}

export function formatRatesMessage(
  data: RatesMessageData,
): string {
  const formatRate = (
    value: number,
    percent?: number,
  ): string => {
    if (percent === undefined) {
      return `${value} ${data.fiat}`;
    }

    const sign = percent > 0 ? '+' : '';

    return `${value} ${data.fiat} (${sign}${percent}%)`;
  };
  const armeniaDate = data.date.toLocaleString('ru-RU', {
    timeZone: 'Asia/Yerevan',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return [
    `📊 <b>Курс ${data.asset}/${data.fiat}</b>`,
    '━━━━━━━━━━━━━━━━━━',
    '',
    `🕐 <b>Актуально на:</b> ${armeniaDate}`,
    '',
    '🔴 <b>ПРОДАЖА</b>',
    '',
    `⬆️ Максимальный: <b>${formatRate(
      data.sell.max,
      data.sell.maxPercent,
    )}</b>`,
    `📊 Средний: <b>${formatRate(
      data.sell.avg,
      data.sell.avgPercent,
    )}</b>`,
    `⬇️ Минимальный: <b>${formatRate(
      data.sell.min,
      data.sell.minPercent,
    )}</b>`,
    '',
    '🟢 <b>ПОКУПКА</b>',
    '',
    `⬆️ Максимальный: <b>${formatRate(
      data.buy.max,
      data.buy.maxPercent,
    )}</b>`,
    `📊 Средний: <b>${formatRate(
      data.buy.avg,
      data.buy.avgPercent,
    )}</b>`,
    `⬇️ Минимальный: <b>${formatRate(
      data.buy.min,
      data.buy.minPercent,
    )}</b>`,
    '',
    '━━━━━━━━━━━━━━━━━━',
  ].join('\n');
}