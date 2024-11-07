import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PriceModule } from '../price/price.module';
import { AlertsModule } from '../alerts/alerts.module';

@Module({
  imports: [PriceModule, AlertsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
