import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';
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
}