import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
  } from '@nestjs/common';
  import Redis from 'ioredis';
  
  @Injectable()
  export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly client: Redis;
  
    constructor() {
      this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT ?? 6379),
        password: process.env.REDIS_PASSWORD || undefined,
        maxRetriesPerRequest: null,
      });
    }
  
    async onModuleInit() {
      await this.client.ping();
    }
  
    async onModuleDestroy() {
      await this.client.quit();
    }
  
    getClient(): Redis {
      return this.client;
    }
  
    async set(key: string, value: string, ttl?: number) {
      if (ttl) {
        return this.client.set(key, value, 'EX', ttl);
      }
  
      return this.client.set(key, value);
    }
  
    async get(key: string) {
      return this.client.get(key);
    }
  
    async del(key: string) {
      return this.client.del(key);
    }
  
    async exists(key: string) {
      return this.client.exists(key);
    }
  
    async expire(key: string, seconds: number) {
      return this.client.expire(key, seconds);
    }
  
    async hset(
      key: string,
      field: string,
      value: string,
    ) {
      return this.client.hset(key, field, value);
    }
  
    async hget(key: string, field: string) {
      return this.client.hget(key, field);
    }
  
    async hgetall(key: string) {
      return this.client.hgetall(key);
    }
  
    async hdel(key: string, field: string) {
      return this.client.hdel(key, field);
    }
  }