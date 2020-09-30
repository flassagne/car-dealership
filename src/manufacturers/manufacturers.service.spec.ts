import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {exception} from 'console';
import * as faker from 'faker';
import {Repository} from 'typeorm';

import {ManufacturerDto} from './dto/manufacturer.dto';
import {Manufacturer} from './manufacturers.entity';
import {ManufacturersService} from './manufacturers.service';

class ManufacturerRepositoryFake {
  async delete(): Promise<void> {}
  async find(): Promise<void> {}
  async findOne(): Promise<void> {}
  async save(): Promise<void> {}
}

describe('ManufacturersService', () => {
  let service: ManufacturersService;
  let repository: Repository<Manufacturer>;

  beforeEach(async () => {
    const module: TestingModule =
        await Test
            .createTestingModule({
              providers: [
                ManufacturersService, {
                  provide: getRepositoryToken(Manufacturer),
                  useClass: ManufacturerRepositoryFake,
                }
              ],
            })
            .compile();

    service = module.get<ManufacturersService>(ManufacturersService);
    repository = module.get(getRepositoryToken(Manufacturer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a manufacturer', async () => {
      const id = faker.random.uuid();

      const manufacturerDto: ManufacturerDto = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        siret: faker.random.number(),
      };

      const manufacturer: Manufacturer = {
        id: id,
        name: manufacturerDto.name,
        phone: manufacturerDto.phone,
        siret: manufacturerDto.siret,
      };

      const manufacturerRepositorySaveSpy =
          jest.spyOn(repository, 'save').mockResolvedValue(manufacturer);

      const result = await service.create(manufacturerDto);

      expect.assertions(2);

      expect(manufacturerRepositorySaveSpy).toBeCalledWith(manufacturerDto);
      expect(result).toEqual(manufacturer);
    });
  });

  describe('delete', () => {
    it('should raise not found error with invalid id', async () => {
      const id = faker.random.uuid();


      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect.assertions(2)

      try {
        await service.delete(id);
      } catch (e) {
        expect(e.message).toEqual('No manufacturer found!');
      }

      expect(manufacturerRepositoryFindOneSpy).toBeCalled();
    });

    it('should delete a manufacturer', async () => {
      const id = faker.random.uuid();
      const manufacturer: Manufacturer = {
        id: id,
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        siret: faker.random.number(),
      }


      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(manufacturer);

      const manufacturerRepositoryDeleteSpy = jest.spyOn(repository, 'delete');

      expect.assertions(2);

      await service.delete(id);

      expect(manufacturerRepositoryFindOneSpy).toBeCalled();
      expect(manufacturerRepositoryDeleteSpy).toBeCalledWith(manufacturer);
    });
  })

  describe('get', () => {
    it('should raise not found error with invalid id', async () => {
      const id = faker.random.uuid();


      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect.assertions(2)

      try {
        await service.get(id);
      } catch (e) {
        expect(e.message).toEqual('No manufacturer found!');
      }

      expect(manufacturerRepositoryFindOneSpy).toBeCalled();
    });

    it('should get a manufacturer', async () => {
      const id = faker.random.uuid();
      const manufacturer: Manufacturer = {
        id: id,
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        siret: faker.random.number(),
      }


      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(manufacturer);


      expect.assertions(2);

      const result = await service.get(id);

      expect(manufacturerRepositoryFindOneSpy).toBeCalled();
      expect(result).toEqual(manufacturer);
    });
  });

  describe('list', () => {
    it('should get empty list with no manufacturers', async () => {
      const manufacturerRepositoryFindSpy =
          jest.spyOn(repository, 'find').mockResolvedValue([]);



      const result = await service.list();

      expect(manufacturerRepositoryFindSpy).toBeCalled();
      expect(result).toEqual([]);
    });

    it('should get manufacturers', async () => {
      const manufacturer: Manufacturer = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        siret: faker.random.number(),
      };
      const manufacturerRepositoryFindSpy =
          jest.spyOn(repository, 'find').mockResolvedValue([manufacturer]);



      const result = await service.list();

      expect(manufacturerRepositoryFindSpy).toBeCalled();
      expect(result).toEqual([manufacturer]);
    });
  });

  describe('update', () => {
    it('should raise not found error with invalid id', async () => {
      const id = faker.random.uuid();


      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect.assertions(2)

      try {
        await service.get(id);
      } catch (e) {
        expect(e.message).toEqual('No manufacturer found!');
      }

      expect(manufacturerRepositoryFindOneSpy).toBeCalled();
    });

    it('should update a manufacturer', async () => {
      const id = faker.random.uuid();
      const phone = faker.phone.phoneNumber();
      const siret = faker.random.number();

      const manufacturer: Manufacturer = {
        id: id,
        name: faker.name.findName(),
        phone: phone,
        siret: siret,
      };

      const manufacturerDto: ManufacturerDto = {
        name: faker.name.findName(),
        phone: phone,
        siret: siret,
      };

      const updateManufacturer: Manufacturer = {
        id: id,
        name: manufacturerDto.name,
        phone: manufacturerDto.phone,
        siret: manufacturerDto.siret,
      };

      const manufacturerRepositoryFindOneSpy =
          jest.spyOn(repository, 'findOne').mockResolvedValue(manufacturer);
      const manufacturerRepositorySaveSpy =
          jest.spyOn(repository, 'save').mockResolvedValue(updateManufacturer);

      const result = await service.update(id, manufacturerDto);

      expect(manufacturerRepositoryFindOneSpy).toBeCalledWith(id);
      expect(manufacturerRepositorySaveSpy).toBeCalledWith(updateManufacturer)
      expect(result).toEqual(updateManufacturer);
    });
  });
});
