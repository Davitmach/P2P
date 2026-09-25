import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  DatabaseModule,
  RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
