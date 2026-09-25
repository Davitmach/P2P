import { Module } from '@nestjs/common';
import { DailyReportsController } from './daily-reports.controller';
import { DailyReportsService } from './daily-reports.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule
  ],
  controllers: [DailyReportsController],
  providers: [DailyReportsService],
})
export class DailyReportsModule {}
