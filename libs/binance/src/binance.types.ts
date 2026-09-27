export type BinanceHttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

export type BinanceParamValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | undefined;

export type BinanceParams = Record<
  string,
  BinanceParamValue
>;



export interface BinanceSearchAdsParams {
  publisherType: string;
  fiat: string;
  asset: string;
  tradeType: BinanceTradeType;

  page?: number;
  rows?: number;

  payTypes?: string[];
  countries?: string[];
  transAmount?: number;
}

export interface BinanceListOrdersParams {
  advNo?: string;
  asset?: string;
  orderStatus?: number;
  tradeType?: BinanceTradeType;
  payType?: string;

  orderStatusList?: number[];

  startDate?: number;
  endDate?: number;

  page?: number;
  rows?: number;
}

export interface BinanceOrderHistoryParams {
  startTimestamp?: number;
  endTimestamp?: number;

  tradeType?: BinanceTradeType;

  page?: number;
  rows?: number;
}

export interface BinanceListOwnAdsParams {
  page?: number;
  rows?: number;

  asset?: string;
  fiat?: string;
  tradeType?: BinanceTradeType;

  advStatus?: number;
}

export interface BinanceReferencePriceParams {
  assets: string[];
  fiatCurrency: string;
  tradeType: BinanceTradeType;
}

export interface BinanceClientOptions {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  recvWindow: number;
}



export interface BinanceResponse<T> {
  code: string;
  message: string | null;
  data: T;
  success: boolean;
}

export interface BinancePaginatedResponse<T> {
  code: string;
  message?: string | null;
  data: T[];
  total: number;
  success: boolean;
}



export type BinanceTradeType =
  | 'BUY'
  | 'SELL';

export interface BinanceTradeMethod {
  identifier: string;
  tradeMethodName: string;
  iconUrlColor?: string;
}

export interface BinanceAd {
  advNo: string;
  classify: string;
  tradeType: BinanceTradeType;
  asset: string;
  fiatUnit: string;

  advStatus: number;
  priceType: number;
  priceFloatingRatio: string;
  price: string;

  initAmount: string;
  surplusAmount: string;
  tradableQuantity: string;

  maxSingleTransAmount: string;
  minSingleTransAmount: string;

  payTimeLimit: number;

  remarks: string;
  autoReplyMsg: string;

  createTime: number;

  tradeMethods: BinanceTradeMethod[];

  buyerKycLimit: number;
  buyerRegDaysLimit: number;
  buyerBtcPositionLimit: string;
  takerAdditionalKycRequired: number;
}

export interface BinanceAdvertiser {
  userNo: string;
  nickName: string;

  orderCount: number;
  monthOrderCount: number;
  monthFinishRate: string;

  advConfirmTime: number;

  userType: string;

  tagIconUrls?: string[];
}

export interface BinanceAdSearchItem {
  adv: BinanceAd;
  advertiser: BinanceAdvertiser;
}



export interface BinanceMerchant {
  merchantNo: string;
  userType: string;
  nickName: string;

  orderCount: number;
  monthOrderCount: number;
  monthFinishRate: string;

  advConfirmTime: number;

  onlineStatus: string;

  registerDays: number;
  firstOrderDays: number;

  avgReleaseTimeOfLatest30day: number;
  avgPayTimeOfLatest30day: number;

  completedOrderNumOfLatest30day: number;
}

export interface BinanceMerchantDetails {
  merchant: BinanceMerchant;
  sellList: BinanceAd[];
  buyList: BinanceAd[];
}



export interface BinanceOrder {
  orderNumber: string;
  advNo: string;

  tradeType: BinanceTradeType;

  asset: string;
  fiat: string;
  fiatSymbol: string;

  amount: string;
  totalPrice: string;

  orderStatus: number;

  createTime: number;

  confirmPayEndTime?: number;
  notifyPayEndTime?: number;

  buyerNickname: string;
  sellerNickname: string;

  commissionRate?: string;
  commission?: string;

  takerCommissionRate: string;
  takerCommission: string;
  takerAmount: string;
}

export interface BinanceOrderDetail {
  orderNumber: string;
  advOrderNumber: string;

  tradeType: BinanceTradeType;

  orderStatus: number;

  asset: string;
  amount: string;

  price: string;
  totalPrice: string;

  fiatUnit: string;
  fiatSymbol: string;

  buyerNickname: string;
  sellerNickname: string;

  createTime: number;

  notifyPayTime?: number;
  confirmPayTime?: number;
  cancelTime?: number;

  notifyPayEndTime?: number;
  confirmPayEndTime?: number;

  isComplaintAllowed: boolean;

  complaintStatus?: number;

  commissionRate?: string;
  commission?: string;

  takerCommissionRate: string;
  takerCommission: string;
  takerAmount: string;
}

export interface BinanceOrderHistory {
  orderNumber: string;
  advNo: string;

  tradeType: BinanceTradeType;

  asset: string;
  fiat: string;
  fiatSymbol: string;

  amount: string;
  totalPrice: string;
  unitPrice: string;

  orderStatus: string;

  createTime: number;

  commission?: string;

  takerCommissionRate: string;
  takerCommission: string;
  takerAmount: string;

  counterPartNickName: string;
  payMethodName: string;

  advertisementRole: string;
}



export interface BinancePayMethod {
  payId: number;
  identifier: string;
  tradeMethodName: string;
}

export interface BinanceSystemTradeMethod {
  identifier: string;
  tradeMethodCode: number;
  nameKey: string;

  valueEn: string;
  valueZhCn: string;

  typeName: string;
}


export interface BinanceReferencePrice {
  asset: string;
  currency: string;

  currencyScale: number;
  currencySymbol: string;

  referencePrice: string;

  assetScale: number;
  priceScale: number;
}