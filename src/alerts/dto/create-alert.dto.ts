import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The blockchain network (e.g., "ethereum", "polygon")',
    example: 'ethereum',
  })
  chain: string;

  @ApiProperty({
    description: 'Target price for the alert (in USD)',
    example: 2500.0,
  })
  targetPrice: number;

  @ApiProperty({
    description: 'User email to receive the alert notification',
    example: 'user@example.com',
  })
  email: string;
}
