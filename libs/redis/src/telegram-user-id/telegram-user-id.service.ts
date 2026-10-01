import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis.service';

@Injectable()
export class TelegramUserIdService {
  private readonly logger = new Logger('MerchandAdsRedis');
  constructor(private readonly redis: RedisService) {}

  setTelegramUserId(userId: string) {
    try {
      return this.redis.set(`telegram:user`, userId);
    } catch (error) {
      this.logger.error(
        `Failed to set telegram user id`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
  async getTelegramUserId(): Promise<string | null> {
    try {
      const data = await this.redis.get(`telegram:user`);
      if (!data) {
        return null;
      }
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to get telegram user id`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
}
