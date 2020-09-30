import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {Raw} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {ManufacturersService} from '../manufacturers/manufacturers.service';
import {Owner} from '../owners/owners.entity';
import {OwnersService} from '../owners/owners.service';

import {Car} from './cars.entity';
import {CarsService} from './cars.service';
import {CarDto} from './dto/car.dto';

@Controller('cars')
export class CarsController {
  constructor(
      private carsService: CarsService,
      private manufacturesService: ManufacturersService,
      private ownersService: OwnersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) carDto: CarDto) {
    const manufacturer =
        await this.manufacturesService.get(carDto.manufacturerID);

    const owners = await Promise.all(carDto.ownersID.map(async (ownerID) => {
      const owner = await this.ownersService.get(ownerID);

      return owner
    }));

    return this.carsService.create(carDto, manufacturer, owners);
  }

  @Get('discount')
  discount() {
    this.removeOwnerOlderThan18Month();
    this.discountOff20PercentCarRegistrationBetween12And18Month();
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.carsService.delete(id);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Car> {
    return this.carsService.get(id);
  }

  @Get()
  list(): Promise<Car[]> {
    return this.carsService.list();
  }

  @Get(':id/manufacturer')
  async manufacturer(@Param('id') id: string): Promise<Manufacturer> {
    const car = await this.carsService.get(id);

    return car.manufacturer;
  }

  @Put(':id')
  async update(
      @Param('id') id: string, @Body(new ValidationPipe()) carDto: CarDto):
      Promise<Car> {
    const manufacturer =
        await this.manufacturesService.get(carDto.manufacturerID);

    const owners = await Promise.all(carDto.ownersID.map(async (ownerID) => {
      const owner = await this.ownersService.get(ownerID);

      return owner
    }));

    return this.carsService.update(id, carDto, manufacturer, owners);
  }

  private async removeOwnerOlderThan18Month() {
    const owners = await this.ownersService.list({
      purchaseDate: Raw(alias => `${alias} < NOW() - interval \'18 month\'`)
    })

    owners.forEach(async (owner) => {
      await this.ownersService.delete(owner.id);
    });
  }

  private async discountOff20PercentCarRegistrationBetween12And18Month() {
    const cars = await this.carsService.list({
      firstRegistrationDate: Raw(
          alias => `${
              alias} BETWEEN (NOW() - interval \'18 month\') AND (NOW() - interval \'12 month\')`)
    });

    cars.forEach(car => car.price -= car.price * 0.25);
  }
}