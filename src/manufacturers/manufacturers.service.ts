import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ManufacturerDto} from './dto/manufacturer.dto';
import {Manufacturer} from './manufacturers.entity';

@Injectable()
export class ManufacturersService {
  constructor(@InjectRepository(Manufacturer) private manufacturersRepository:
                  Repository<Manufacturer>) {}

  create(manufacturerDto: ManufacturerDto): Promise<Manufacturer> {
    const manufacturer = new Manufacturer();

    manufacturer.name = manufacturerDto.name;
    manufacturer.phone = manufacturerDto.phone;
    manufacturer.siret = manufacturerDto.siret;

    return this.manufacturersRepository.save(manufacturer);
  }

  async delete(id: string): Promise<void> {
    const manufacturer = await this.manufacturersRepository.findOne(id);
    this.throwNotFoundOnNull(manufacturer);

    await this.manufacturersRepository.delete(manufacturer);
  }

  async get(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturersRepository.findOne(id);
    this.throwNotFoundOnNull(manufacturer);

    return manufacturer;
  }

  list(): Promise<Manufacturer[]> {
    return this.manufacturersRepository.find();
  }

  async update(id: string, manufacturerDto: ManufacturerDto):
      Promise<Manufacturer> {
    const manufacturer = await this.manufacturersRepository.findOne(id);
    this.throwNotFoundOnNull(manufacturer);

    manufacturer.name = manufacturerDto.name;
    manufacturer.phone = manufacturerDto.phone;
    manufacturer.siret = manufacturerDto.siret;

    return this.manufacturersRepository.save(manufacturer);
  }

  private throwNotFoundOnNull(manufacturer: Manufacturer): void {
    if (!manufacturer) {
      throw new NotFoundException('No manufacturer found!');
    }
  }
}
