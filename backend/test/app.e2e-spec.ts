import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/weather-info (GET)', () => {
    it('should match `?q=L3T` with the city "Markham"', () => {
      return request(app.getHttpServer())
      .get('/weather-info')
      .query({
        'q': 'L3T'
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({
          name: "Markham"
        }));
      });
    });

    it('should match `?lat=43.8407555&lng=-79.3963909` with the city "Buttonville"', () => {
      return request(app.getHttpServer())
      .get('/weather-info')
      .query({ lat: "43.8407555", lng: "-79.3963909" })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({
          name: "Buttonville"
        }));
      });
    });
    
    it('should match `?q=st.%20louis%0A` with the city "St Louis"', () => {
      return request(app.getHttpServer())
      .get('/weather-info')
      .query({
        'q': 'st. louis'
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({
          name: "St Louis"
        }));
      });
    });
  });

  afterAll(() => app.close());
});
