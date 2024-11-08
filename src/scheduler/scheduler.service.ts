import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PriceService } from '../price/price.service';
import { AlertsService } from '../alerts/alerts.service';
import { sendEmail } from 'src/common/utils/email.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchedulerService {
  constructor(
    private pricesService: PriceService,
    private alertsService: AlertsService,
    private readonly configService: ConfigService,
  ) {}

  getAlertEmail(): string {
    return this.configService.get<string>(
      'ALERT_EMAIL',
      'hyperhire_assignment@hyperhire.in',
    ); // default to 3000 if not set
  }

  @Cron('*/5 * * * *')
  async handlePriceCheck() {
    const chains = ['ethereum', 'polygon'];
    for (const chain of chains) {
      await this.pricesService.fetchAndSavePrice(chain);
      const latestPrice = (
        await this.pricesService.getHourlyPrices(chain)
      ).pop();
      if (latestPrice) {
        await this.alertsService.checkAlerts(latestPrice.price, chain);

        const oneHourAgoPrice = (
          await this.pricesService.getHourlyPrices(chain)
        ).slice(-2, -1)[0];

        if (oneHourAgoPrice) {
          const priceIncrease =
            ((latestPrice.price - oneHourAgoPrice.price) /
              oneHourAgoPrice.price) *
            100;

          if (priceIncrease >= 3) {
            // If price increased by more than 3%, send the email
            await sendEmail(
              this.getAlertEmail(),
              `Price Alert: ${chain} Price Increased by 3%`,
              `The price of ${chain} has increased by ${priceIncrease.toFixed(2)}% in the last hour. The current price is ${latestPrice.price}.`,
            );
            console.log(
              `Price of ${chain} increased by more than 3%. Email sent.`,
            );
          }
        }
      }
    }
  }
}
