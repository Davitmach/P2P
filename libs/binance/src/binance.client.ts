import { Injectable } from '@nestjs/common';

import { BinanceSigner } from './binance.signer';

import {
  BinanceAd,
  BinanceAdSearchItem,
  BinanceHttpMethod,
  BinanceListOrdersParams,
  BinanceListOwnAdsParams,
  BinanceMerchantDetails,
  BinanceOrder,
  BinanceOrderDetail,
  BinanceOrderHistory,
  BinanceOrderHistoryParams,
  BinancePaginatedResponse,
  BinancePayMethod,
  BinanceReferencePrice,
  BinanceReferencePriceParams,
  BinanceResponse,
  BinanceSearchAdsParams,
  BinanceSystemTradeMethod,
} from './binance.types';

@Injectable()
export class BinanceClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly recvWindow: number;
  private readonly signer: BinanceSigner;

  constructor() {
    const apiSecret = process.env.BINANCE_API_SECRET;
    const apiKey = process.env.BINANCE_API_KEY;

    if (!apiSecret) {
      throw new Error('BINANCE_API_SECRET is not configured');
    }

    if (!apiKey) {
      throw new Error('BINANCE_API_KEY is not configured');
    }

    this.baseUrl =
      process.env.BINANCE_BASE_URL ??
      'https://api.binance.com';

    this.apiKey = apiKey;

    this.recvWindow = Number(
      process.env.BINANCE_RECV_WINDOW ?? 5000,
    );

    this.signer = new BinanceSigner(apiSecret);
  }



  async request<T>(
    method: BinanceHttpMethod,
    path: string,
    params: object = {},
  ): Promise<T> {
    const timestamp = Date.now();

    const authParams = {
      recvWindow: this.recvWindow,
      timestamp,
    };

    /**
     * For Binance Agent SAPI:
     *
     * GET:
     *   business params + auth params -> query string
     *
     * POST/PUT/DELETE:
     *   auth params -> query string
     *   business params -> JSON body
     */
    const body =
      method === 'POST' ||
      method === 'PUT' ||
      method === 'DELETE'
        ? params
        : undefined;

    const queryParams =
      method === 'GET'
        ? {
            ...params,
            ...authParams,
          }
        : authParams;

    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce(
        (result, [key, value]) => {
          if (value === undefined) {
            return result;
          }

          if (Array.isArray(value)) {
            result[key] = value.join(',');
          } else {
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
      `?${queryString}` +
      `&signature=${signature}`;

    const response = await fetch(url, {
      method,
      headers: {
        'X-MBX-APIKEY': this.apiKey,
        'User-Agent': 'binance-wallet/1.0.0 (P2P-bot)',
        'Content-Type': 'application/json',
      },
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
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
    params: object = {},
  ): Promise<T> {
    return this.request<T>(
      'GET',
      path,
      params,
    );
  }

  async post<T>(
    path: string,
    params: object = {},
  ): Promise<T> {
    return this.request<T>(
      'POST',
      path,
      params,
    );
  }



  async searchAds(
    params: BinanceSearchAdsParams,
  ): Promise<
    BinancePaginatedResponse<BinanceAdSearchItem>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/ads/search',
      params,
    );
  }

  async getMerchantDetails(
    merchantNo: string,
  ): Promise<
    BinanceResponse<BinanceMerchantDetails>
  > {
    return this.get(
      '/sapi/v1/c2c/agent/merchant/getAdDetails',
      {
        merchantNo,
      },
    );
  }



  async listOrders(
    params: BinanceListOrdersParams = {},
  ): Promise<
    BinancePaginatedResponse<BinanceOrder>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/orderMatch/listOrders',
      params,
    );
  }

  async getOrderDetail(
    orderNumber: string,
  ): Promise<
    BinanceResponse<BinanceOrderDetail>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/orderMatch/getUserOrderDetail',
      {
        orderNumber,
      },
    );
  }

  async getOrderHistory(
    params: BinanceOrderHistoryParams = {},
  ): Promise<
    BinancePaginatedResponse<BinanceOrderHistory>
  > {
    return this.get(
      '/sapi/v1/c2c/agent/orderMatch/listUserOrderHistory',
      params,
    );
  }



  async listOwnAds(
    params: BinanceListOwnAdsParams = {},
  ): Promise<
    BinancePaginatedResponse<BinanceAd>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/ads/listWithPagination',
      params,
    );
  }



  async getUserPaymentMethods(): Promise<
    BinanceResponse<BinancePayMethod[]>
  > {
    return this.get(
      '/sapi/v1/c2c/agent/ads/getPayMethodByUserId',
    );
  }

  async listTradeMethods(): Promise<
    BinanceResponse<BinanceSystemTradeMethod[]>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/ads/listAllTradeMethods',
    );
  }


  async getReferencePrice(
    params: BinanceReferencePriceParams,
  ): Promise<
    BinanceResponse<BinanceReferencePrice[]>
  > {
    return this.post(
      '/sapi/v1/c2c/agent/ads/getReferencePrice',
      params,
    );
  }
}