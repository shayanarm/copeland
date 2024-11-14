import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('weather-info')
  async getWeatherInfo(
    @Query('q') q: string | undefined | null,
    @Query('lat') lat: string | undefined | null,
    @Query('lng') lng: string | undefined | null
  ): Promise<any> {
    let query = undefined;

    const latitude = lat ? parseFloat(lat) : undefined;
    const longitude = lng ? parseFloat(lng) : undefined;

    if (q) {
      query = q;
    } else if (latitude !== undefined && longitude !== undefined && !isNaN(latitude) && !isNaN(longitude)) {
      query = { lat: latitude, lng: longitude };
    }

    if (q) {
      query = q;
    } else if (typeof lat === "number" && typeof lng === "number") {
      query = { lat, lng };
    }

    console.log(query);

    if (!query) {
      throw new Error('Either the `q` parameter, or both the `lat` and `lng` parameter is required');
    }

    return await this.appService.getWeatherInfo(query);
  }
}
