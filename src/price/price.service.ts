import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MoreThan, Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import Moralis from 'moralis';

@Injectable()
export class PriceService implements OnModuleInit {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,

    private readonly configService: ConfigService,
  ) {}

  // Initialize Moralis
  async onModuleInit() {
    const apiKey = this.getmoralisApiKey();
    if (!apiKey) {
      throw new Error('Moralis API key is missing');
    }

    await Moralis.start({ apiKey: apiKey });
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getPort(): number {
    return this.configService.get<number>('PORT', 3000); // default to 3000 if not set
  }
  getWmatic(): string {
    return this.configService.get<string>(
      'WMATIC',
      '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    ); // default to 3000 if not set
  }
  getWeth(): string {
    return this.configService.get<string>(
      'WETH',
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    ); // default to 3000 if not set
  }

  getmoralisApiKey(): string {
    return this.configService.get<string>('MORALIS_API_KEY');
  }

  // Fetch price and save it in the database
  async fetchAndSavePrice(chain: string): Promise<void> {
    let chainHex: string;
    let address: string;
    if (chain === 'ethereum') {
      chainHex = '0x1';
      address = this.getWeth();
    } else if (chain === 'polygon') {
      chainHex = '0x89';
      address = this.getWmatic();
    } else {
      throw new Error('Unsupported chain');
    }

    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: chainHex,
      address: address,
    });

    const price = response.raw.usdPrice;

    const priceRecord = this.priceRepository.create({
      chain,
      price,
      timestamp: new Date(),
    });
    await this.priceRepository.save(priceRecord);
  }

  // Get hourly prices from the database
  async getHourlyPrices(chain: string): Promise<Price[]> {
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    return this.priceRepository.find({
      where: { chain, timestamp: MoreThan(last24Hours) },
      order: { timestamp: 'ASC' },
    });
  }
}
