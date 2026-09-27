export type BinanceHttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

export type BinanceParams = Record<
  string,
  string | number | boolean | undefined
>;

export interface BinanceClientOptions {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  recvWindow: number;
}