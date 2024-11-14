import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('weather-info')
  async getWeatherInfo(@Query('query') query: string): Promise<any> {
    if (!query) {
      throw new Error('Query parameter is required');
    }

    return await this.appService.getWeatherInfo(query);
  }
}
