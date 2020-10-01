import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import * as faker from 'faker';
import {Repository} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {Owner} from '../owners/owners.entity'
import {Car} from './cars.entity';
import {CarsService} from './cars.service';
import {CarDto} from './dto/car.dto';

export class CarRepositoryFake {
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<void> {}
}

describe('CarsService', () => {
  let service: CarsService;
  let repository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test
                                      .createTestingModule({
                                        providers: [
                                          CarsService, {
                                            provide: getRepositoryToken(Car),
                                            useClass: CarRepositoryFake,
                                          }
                                        ],
                                      })
                                      .compile();

    service = module.get<CarsService>(CarsService);
    repository = module.get(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe.skip('create a owner', () => {
    it('should create a owner', async () => {
      const carId = faker.random.uuid();
      const manufacturerId = faker.random.uuid();
      const ownersId = [faker.random.uuid()];

      const carDto: CarDto = {
        price: 25000,
        manufacturerID: manufacturerId,
        firstRegistrationDate: new Date('2020-09-30T00:00:00Z'),
        ownersID: ownersId,
      };

      const manufacturer: Manufacturer = {
        id: manufacturerId,
        name: 'Toyota',
        phone: '+33656547834',
        siret: faker.random.number(),
      }

      const car = new Car();

      const owners: Owner[] = [{
        id: ownersId[0],
        name: faker.name.findName(),
        purchaseDate: new Date('2020-09-35T00:00:00Z'),
        car: car,
      }];

      car.id = carId;
      car.manufacturer = manufacturer;
      car.price = carDto.price;
      car.firstRegistrationDate = carDto.firstRegistrationDate;
      car.owners = owners;

      const carRepositorySaveSpy =
          jest.spyOn(repository, 'save').mockResolvedValue(car);

      const result = await service.create(carDto, manufacturer, owners);

      expect(carRepositorySaveSpy).toBeCalledWith(car);
      expect(result).toEqual(car);
    });
  });


  // describe.skip('delete a owner', () => {
  //   it('should delete a owner', async () => {
  //     const id = faker.random.uuid();

  //     const ownerRepositoryDeleteSpy = jest.spyOn(repository, 'delete');

  //     await service.delete(id);

  //     expect(ownerRepositoryDeleteSpy).toBeCalled();
  //   });
  // });

  // describe.skip('get a owner', () => {
  //   it('should raise not found error on invalid id', async () => {
  //     const id = faker.random.uuid();

  //     const ownerRepositoryFindOneSpy =
  //         jest.spyOn(repository, 'findOne').mockResolvedValue(null);


  //     try {
  //       await service.get(id);
  //     } catch (e) {
  //       expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
  //       expect(e.message).toEqual('No owner found!');
  //     }
  //   });

  //   it('should get a owner', async () => {
  //     const id = faker.random.uuid();

  //     const owner: Car = {
  //       id: id,
  //       name: 'John',
  //       purchaseDate: new Date('2020-09-30'),
  //     };

  //     const ownerRepositoryFindOneSpy =
  //         jest.spyOn(repository, 'findOne').mockResolvedValue(owner);

  //     const result = await service.get(id);

  //     expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
  //     expect(result).toEqual(owner);
  //   });
  // });

  // describe.skip('list owner', () => {
  //   it('should empty when no owner exists', async () => {
  //     const ownerRepositoryFindSpy =
  //         jest.spyOn(repository, 'find').mockResolvedValue([]);

  //     const result = await service.list();

  //     expect(ownerRepositoryFindSpy).toBeCalled();
  //     expect(result).toEqual([]);
  //   });

  //   it('should list owner ', async () => {
  //     const owners: Car[] = [{
  //       id: faker.random.uuid(),
  //       name: 'John',
  //       purchaseDate: new Date('2020-09-30'),
  //     }];

  //     const ownerRepositoryFindSpy =
  //         jest.spyOn(repository, 'find').mockResolvedValue(owners);

  //     const result = await service.list();

  //     expect(ownerRepositoryFindSpy).toBeCalled();
  //     expect(result).toEqual(owners);
  //   });
  // });

  // describe.skip('update owner', () => {
  //   it('raise not found error on invalid id', async () => {
  //     const id = faker.random.uuid();
  //     const ownerDto: CarDto = {
  //       name: 'John',
  //       purchaseDate: new Date('2020-09-30'),
  //     }

  //     const ownerRepositoryFindOneSpy =
  //         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

  //     expect.assertions(2)

  //     try {
  //       await service.update(id, ownerDto);
  //     } catch (e) {
  //       expect(e.message).toEqual('No owner found!');
  //     }

  //     expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
  //   });

  //   it('should update owner', async () => {
  //     const id = faker.random.uuid();
  //     const ownerDto: CarDto = {
  //       name: 'John',
  //       purchaseDate: new Date('2020-09-30'),
  //     }

  //     const owner: Car = {
  //       id: id,
  //       name: 'John',
  //       purchaseDate: new Date('2020-09-28'),
  //     }

  //     const updatedOwner: Car = {
  //       id: id,
  //       name: ownerDto.name,
  //       purchaseDate: ownerDto.purchaseDate,
  //     }

  //     const ownerRepositoryFindOneSpy =
  //         jest.spyOn(repository, 'findOne').mockResolvedValue(owner);
  //     const ownerRepositorySaveSpy =
  //         jest.spyOn(repository, 'save').mockResolvedValue(updatedOwner);

  //     expect.assertions(3);

  //     const result = await service.update(id, ownerDto);

  //     expect(ownerRepositoryFindOneSpy).toBeCalledWith(id);
  //     expect(ownerRepositorySaveSpy).toBeCalledWith(updatedOwner);
  //     expect(result).toEqual(updatedOwner);
  //   })
  // });
});
