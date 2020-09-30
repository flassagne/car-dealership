import {INestApplication, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import * as faker from 'faker';
import {OwnerDto} from 'src/owners/dto/owner.dto';
import * as request from 'supertest';
import {Repository} from 'typeorm';

import {OwnersController} from '../src/owners/owners.controller';
import {Owner} from '../src/owners/owners.entity';
import {OwnersService} from '../src/owners/owners.service';
import {OwnerRepositoryFake} from '../src/owners/owners.service.spec'

class OwnersServiceFake {
  async create(): Promise<void> {}
  async delete(): Promise<void> {}
  async get(): Promise<void> {}
  async list(): Promise<void> {}
}

describe('OwnersController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Owner>;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
        await Test
            .createTestingModule({
              providers: [
                OwnersService, {
                  provide: getRepositoryToken(Owner),
                  useClass: OwnerRepositoryFake,
                }
              ],
              controllers: [OwnersController],
            })
            .compile();

    repository = moduleFixture.get(getRepositoryToken(Owner));

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('GET /owners', () => {
    const spy = jest.spyOn(repository, 'find').mockResolvedValue([]);

    return request(app.getHttpServer()).get('/owners').expect(200).expect([]);
  });

  describe.skip('GET /owners/:id', () => {
    it('get http code 404 with invalid id', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      return request(app.getHttpServer).get('/owners/aaa').expect(404);
    });

    it('get http code 200', () => {
      const id = faker.random.uuid();
      const name = 'John';
      const date = '2020-09-30T00:00:00.000Z';

      const owner: Owner = {
        id: id,
        name: name,
        purchaseDate: new Date(date),
      };

      const serializedOwner = {
        id: id,
        name: name,
        purchaseDate: date,
      };


      jest.spyOn(repository, 'findOne').mockResolvedValue(owner);

      return request(app.getHttpServer)
          .get('/owners/aaa')
          .expect(200, serializedOwner);
    });
  });

  describe('POST /owners', () => {
    it('get http code 400 with invalid owner dto', () => {
      return request(app.getHttpServer()).post('/owners').send({}).expect(400);
    });

    it('get http code 201', () => {
      const id = faker.random.uuid();
      const name = 'John';
      const date = '2020-09-30T00:00:00.000Z';

      const ownerDto: OwnerDto = {
        name: 'John',
        purchaseDate: new Date(date),
      };

      const owner: Owner = {
        id: id,
        name: ownerDto.name,
        purchaseDate: ownerDto.purchaseDate
      };

      const serializedOwner = {
        id: id,
        name: name,
        purchaseDate: date,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(owner);

      return request(app.getHttpServer())
          .post('/owners')
          .send({
            name: name,
            purchaseDate: date,
          })
          .expect(201, serializedOwner);
    });

    describe.skip('UPDATE /owners/:id', () => {
      it('get http code 200', () => {
        const id = faker.random.uuid();
        const name = 'John';
        const date = '2020-09-30T00:00:00.000Z';

        const ownerDto: OwnerDto = {
          name: name,
          purchaseDate: new Date(date)
        }

        const owner: Owner = {
          id: id,
          name: ownerDto.name,
          purchaseDate: ownerDto.purchaseDate,
        };

        const updateOwner: Owner = {
          id: id,
          name: ownerDto.name,
          purchaseDate: new Date('2020-09-28T00:00:00.000Z'),
        };

        const serializedOwner = {
          id: id,
          name: name,
          purchaseDate: '2020-09-28T00:00:00.000Z',
        };


        jest.spyOn(repository, 'findOne').mockResolvedValue(owner);
        jest.spyOn(repository, 'save').mockResolvedValue(updateOwner);

        return request(app.getHttpServer)
            .get('/owners/aaa')
            .expect(200, serializedOwner);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
