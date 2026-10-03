interface PriceRange {
    max: number;
    min: number;
    avg: number;
  }
  
  interface PriceReportData {
    buy: PriceRange;
    sell: PriceRange;
  }
  
  export const priceReport = (prices: PriceReportData): string => {
    return [
      '📊 <b>BORYA — P2P RATES</b>',
      '',
      '🟢 <b>ПОКУПКА USDT</b>',
      `Средняя: ${prices.buy.avg} ֏`,
      `Минимум: ${prices.buy.min} ֏`,
      `Максимум: ${prices.buy.max} ֏`,
      '',
      '🔴 <b>ПРОДАЖА USDT</b>',
      `Средняя: ${prices.sell.avg} ֏`,
      `Минимум: ${prices.sell.min} ֏`,
      `Максимум: ${prices.sell.max} ֏`,
    ].join('\n');
  };