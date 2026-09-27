import { Injectable } from '@nestjs/common';
import { BinanceSigner } from './binance.signer';
import {
  BinanceHttpMethod,
  BinanceParams,
} from './binance.types';

@Injectable()
export class BinanceClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly recvWindow: number;
  private readonly signer: BinanceSigner;

  constructor() {
    const apiSecret = process.env.BINANCE_API_SECRET;

    if (!apiSecret) {
      throw new Error(
        'BINANCE_API_SECRET is not configured',
      );
    }

    if (!process.env.BINANCE_API_KEY) {
      throw new Error(
        'BINANCE_API_KEY is not configured',
      );
    }

    this.baseUrl =
      process.env.BINANCE_BASE_URL ??
      'https://api.binance.com';

    this.apiKey = process.env.BINANCE_API_KEY;

    this.recvWindow = Number(
      process.env.BINANCE_RECV_WINDOW ?? 5000,
    );

    this.signer = new BinanceSigner(apiSecret);
  }

  async request<T>(
    method: BinanceHttpMethod,
    path: string,
    params: BinanceParams = {},
  ): Promise<T> {
    const timestamp = Date.now();

    const requestParams: BinanceParams = {
      ...params,
      recvWindow: this.recvWindow,
      timestamp,
    };

    const queryString = new URLSearchParams(
      Object.entries(requestParams).reduce(
        (result, [key, value]) => {
          if (value !== undefined) {
            result[key] = String(value);
          }

          return result;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    const signature = this.signer.sign(queryString);

    const url =
      `${this.baseUrl}${path}` +
      `?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
      method,
      headers: {
        'X-MBX-APIKEY': this.apiKey,
        'User-Agent': 'binance-wallet/1.0.0 (P2P-bot)',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Binance API error ${response.status}: ${JSON.stringify(data)}`,
      );
    }

    return data as T;
  }

  async get<T>(
    path: string,
    params: BinanceParams = {},
  ): Promise<T> {
    return this.request<T>('GET', path, params);
  }

  async post<T>(
    path: string,
    params: BinanceParams = {},
  ): Promise<T> {
    return this.request<T>('POST', path, params);
  }
}