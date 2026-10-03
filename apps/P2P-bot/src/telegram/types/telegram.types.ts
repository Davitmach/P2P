
export interface PriceRange {
  max: number;
  min: number;
  avg: number;
}

export interface PriceReportData {
  buy: PriceRange;
  sell: PriceRange;
}

export interface TelegramPriceNotification {
  chatId: string;
  data: PriceReportData;
}
