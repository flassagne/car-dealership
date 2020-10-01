import {INestApplication} from '@nestjs/common'
import {Test} from '@nestjs/testing';
import * as request from 'supertest';

import {CarsModule} from '../src/cars/cars.module';
import {CarsService} from '../src/cars/cars.service';
import {CarDto} from '../src/cars/dto/car.dto';

describe.skip('Cars', () => {
  let app: INestApplication;
  let carsService = {
    create: (carDto) => {
      return {
        id: '1',
        name: 'lamborghini',
        manufacturerID: '5',
        price: 20000,
        ownersID: ['1']
      };
    },
    update: (id, carDto) => {
      return {
        id: '1',
        name: 'lamborghini',
        manufacturerID: '5',
        price: 150000,
        ownersID: ['1']
      };
    }
  }

  beforeAll(async () => {
    const moduleRef = await Test
                          .createTestingModule({
                            imports: [CarsModule],
                          })
                          .overrideProvider(CarsService)
                          .useValue(carsService)
                          .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  describe('/POST cars', () => {
    it('should create a car', () => {
      const body: CarDto = {
        manufacturerID: '5',
        price: 20000,
        firstRegistrationDate: new Date('2020-09-30'),
        ownersID: ['1']
      };

      return request(app.getHttpServer()).post('/cars').send(body).expect(201);
    });

    it('should return 400 with invalid body', () => {
      const body = {name: 'lamborghini'};

      return request(app.getHttpServer()).post('/cars').send(body).expect(400);
    });
  });

  describe('/PUT cars', () => {
    it('should update a car', () => {
      const body: CarDto = {
        manufacturerID: '5',
        price: 150000,
        firstRegistrationDate: new Date('2020-09-30'),
        ownersID: ['1']
      };

      return request(app.getHttpServer()).put('/cars/1').send(body).expect(200)
    });

    it('should return 400 with invalid body', () => {
      const body = {name: 'lamborghini'};

      return request(app.getHttpServer()).put('/cars/1').send(body).expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  })
})