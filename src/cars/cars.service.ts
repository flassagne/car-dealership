import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {Owner} from '../owners/owners.entity';

import {Car} from './cars.entity';
import {CarDto} from './dto/car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}

  async create(carDto: CarDto, manufacturer: Manufacturer, owners: Owner[]) {
    const car = new Car();

    car.manufacturer = manufacturer;
    car.price = carDto.price;
    car.firstRegistrationDate = carDto.firstRegistrationDate;
    car.owners = owners

    console.log(car)

    return this.carsRepository.save(car);
  }

  async delete(id: string): Promise<void> {
    const car = await this.carsRepository.findOne(id);
    this.throwNotFoundOnNull(car);

    await this.carsRepository.delete(id);
  }

  async get(id: string): Promise<Car> {
    const car = await this.carsRepository.findOne(id);
    this.throwNotFoundOnNull(car);

    return car;
  }

  list(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  async update(
      id: string, carDto: CarDto, manufacturer: Manufacturer,
      owners: Owner[]): Promise<Car> {
    const car = await this.carsRepository.findOne(id);
    this.throwNotFoundOnNull(car);

    car.manufacturer = manufacturer;
    car.owners = owners;
    car.price = carDto.price;
    car.firstRegistrationDate = carDto.firstRegistrationDate;

    return this.carsRepository.save(car);
  }

  private throwNotFoundOnNull(car: Car): any {
    if (!car) {
      throw new NotFoundException('No car found');
    }
  }
}
