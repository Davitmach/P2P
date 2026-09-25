import { RedisService } from '@app/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
   
  ) {}
  async getHello() {
return 1
    
  }
}
