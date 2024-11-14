import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor() {
    this.apiKey = process.env.OPEN_WEATHER_MAP_KEY;
  }
  async getWeatherInfo(query: string): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: query,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch weather data');
    }
  }
}
