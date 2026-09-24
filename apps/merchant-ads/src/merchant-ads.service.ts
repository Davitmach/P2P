import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantAdsService {
  getHello(): string {
    return 'Hello World!';
  }
}
