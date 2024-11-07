import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  // Endpoint to create a new alert
  @Post()
  @ApiOperation({ summary: 'Create a new price alert' })
  @ApiResponse({ status: 201, description: 'Alert created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @HttpCode(HttpStatus.CREATED)
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    const { chain, targetPrice, email } = createAlertDto;

    const alert = await this.alertsService.createAlert(
      chain,
      targetPrice,
      email,
    );
    return {
      message: 'Alert created successfully',
      alert,
    };
  }
}
