import { Controller, Get, Param, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Price')
@Controller('prices')
export class PriceController {
  constructor(private readonly pricesService: PriceService) {}

  @Get('/:chain/hourly')
  @ApiOperation({ summary: 'Get latest price by chain' })
  @ApiParam({
    name: 'chain',
    description: 'Blockchain name (e.g., ethereum, polygon)',
  })
  async getHourlyPrices(@Param('chain') chain: string) {
    return await this.pricesService.getHourlyPrices(chain);
  }

  @Post('/:chain/fetch')
  async fetchAndSavePrice(@Param('chain') chain: string) {
    await this.pricesService.fetchAndSavePrice(chain);
    return { message: `Price for ${chain} fetched and saved successfully.` };
  }
}
