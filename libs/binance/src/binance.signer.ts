import { createHmac } from 'node:crypto';

export class BinanceSigner {
  constructor(
    private readonly secret: string,
  ) {}

  sign(payload: string): string {
    return createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
  }
}