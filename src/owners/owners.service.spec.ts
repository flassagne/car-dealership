import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import * as faker from 'faker';
import {Repository} from 'typeorm';

import {Car} from '../cars/cars.entity';

import {OwnerDto} from './dto/owner.dto';
import {Owner} from './owners.entity';
import {OwnersService} from './owners.service';


export class OwnerRepositoryFake {
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<void> {}
}

describe('OwnersService', () => {
  let service: OwnersService;
  let repository: Repository<Owner>;

  beforeEach(async () => {
    const module: TestingModule = await Test
                                      .createTestingModule({
                                        providers: [
                                          OwnersService, {
                                            provide: getRepositoryToken(Owner),
                                            useClass: OwnerRepositoryFake
                                          }
                                        ],
                                      })
                                      .compile();

    service = module.get<OwnersService>(OwnersService);
    repository = module.get(getRepositoryToken(Owner));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a owner', () => {
    it('should create a owner', async () => {
      const ownerDto: OwnerDto = {
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
      };

      const owner: Owner = {
        id: faker.random.uuid(),
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
        car: new Car()
      }

      const ownerRepositorySaveSpy =
          jest.spyOn(repository, 'save').mockResolvedValue(owner);

      const result = await service.create(ownerDto);

      expect(ownerRepositorySaveSpy).toBeCalledWith(ownerDto);
      expect(result).toEqual(owner);
    });
  });


  describe('delete a owner', () => {
    it('should delete a owner', async () => {
      const id = faker.random.uuid();

      const ownerRepositoryDeleteSpy = jest.spyOn(repository, 'delete');

      await service.delete(id);

      expect(ownerRepositoryDeleteSpy).toBeCalled();
    });
  });

  describe('get a owner', () => {
    it('should raise not found error on invalid id', async () => {
      const id = faker.random.uuid();

      const ownerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);


      try {
        await service.get(id);
      } catch (e) {
        expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
        expect(e.message).toEqual('No owner found!');
      }
    });

    it('should get a owner', async () => {
      const id = faker.random.uuid();

      const owner: Owner = {
        id: id,
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
        car: new Car()
      };

      const ownerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(owner);

      const result = await service.get(id);

      expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
      expect(result).toEqual(owner);
    });
  });

  describe('list owner', () => {
    it('should empty when no owner exists', async () => {
      const ownerRepositoryFindSpy =
          jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.list();

      expect(ownerRepositoryFindSpy).toBeCalled();
      expect(result).toEqual([]);
    });

    it('should list owner ', async () => {
      const owners: Owner[] = [{
        id: faker.random.uuid(),
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
        car: new Car()
      }];

      const ownerRepositoryFindSpy =
          jest.spyOn(repository, 'find').mockResolvedValue(owners);

      const result = await service.list();

      expect(ownerRepositoryFindSpy).toBeCalled();
      expect(result).toEqual(owners);
    });
  });

  describe('update owner', () => {
    it('raise not found error on invalid id', async () => {
      const id = faker.random.uuid();
      const ownerDto: OwnerDto = {
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
      }

      const ownerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect.assertions(2)

      try {
        await service.update(id, ownerDto);
      } catch (e) {
        expect(e.message).toEqual('No owner found!');
      }

      expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
    });

    it('should update owner', async () => {
      const id = faker.random.uuid();
      const ownerDto: OwnerDto = {
        name: 'John',
        purchaseDate: new Date('2020-09-30'),
      }

      const car = new Car();
      const owner: Owner = {
        id: id,
        name: 'John',
        purchaseDate: new Date('2020-09-28'),
        car: car,
      }

      const updatedOwner: Owner = {
        id: id,
        name: ownerDto.name,
        purchaseDate: ownerDto.purchaseDate,
        car: car,
      }

      const ownerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(owner);
      const ownerRepositorySaveSpy =
          jest.spyOn(repository, 'save').mockResolvedValue(updatedOwner);

      expect.assertions(3);

      const result = await service.update(id, ownerDto);

      expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
      expect(ownerRepositorySaveSpy).toBeCalledWith(updatedOwner);
      expect(result).toEqual(updatedOwner);
    })
  });
});
