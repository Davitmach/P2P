import { RedisService } from '@app/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly redis: RedisService,
  ) {}
  async getHello() {
    const ca = await this.redis.get('qaq')
    console.log(ca)
     return 1
    
  }
}
