import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor() {
    this.apiKey = process.env.OPEN_WEATHER_MAP_KEY;
  }
  async getWeatherInfo(query: string | { lat: number, lng: number }): Promise<any> {
    const extionsion =
      typeof query === 'string'
        ? { q: query }
        : { lat: query.lat, lon: query.lng };
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          appid: this.apiKey,
          units: 'metric',
          ...extionsion
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch weather data');
    }
  }
}
