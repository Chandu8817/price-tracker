import { Controller, Get, Param, Post } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('prices')
export class PriceController {
  constructor(private readonly pricesService: PriceService) {}

  @Get('/:chain/hourly')
  async getHourlyPrices(@Param('chain') chain: string) {
    return await this.pricesService.getHourlyPrices(chain);
  }

  @Post('/:chain/fetch')
  async fetchAndSavePrice(@Param('chain') chain: string) {
    await this.pricesService.fetchAndSavePrice(chain);
    return { message: `Price for ${chain} fetched and saved successfully.` };
  }
}
