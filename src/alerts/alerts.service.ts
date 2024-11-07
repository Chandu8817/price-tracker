import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { sendEmail } from '../common/utils/email.util';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert) private alertRepository: Repository<Alert>,
  ) {}

  async createAlert(
    chain: string,
    targetPrice: number,
    email: string,
  ): Promise<Alert> {
    const alert = this.alertRepository.create({ chain, targetPrice, email });
    return await this.alertRepository.save(alert);
  }

  async checkAlerts(currentPrice: number, chain: string) {
    const alerts = await this.alertRepository.find({
      where: { chain, targetPrice: LessThanOrEqual(currentPrice) },
    });
    for (const alert of alerts) {
      await sendEmail(
        alert.email,
        `Price Alert for ${chain}`,
        `The price of ${chain} has reached ${alert.targetPrice}.`,
      );
      await this.alertRepository.remove(alert); // Delete alert after sending email
    }
  }
}
