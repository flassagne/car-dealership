import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Raw} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {ManufacturersService} from '../manufacturers/manufacturers.service';
import {OwnersService} from '../owners/owners.service';

import {Car} from './cars.entity';
import {CarsService} from './cars.service';
import {CarDto} from './dto/car.dto';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(
      private carsService: CarsService,
      private manufacturesService: ManufacturersService,
      private ownersService: OwnersService) {}

  @Post()
  @ApiCreatedResponse({description: 'The car has been successfully created.', type: Car})
  @ApiNotFoundResponse({ description: 'The manufacturer or owners has not found.'})
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
  @ApiOkResponse({
    description:
        'Remove all owners with purchase date before 18 months and apply 20 off for car with first registration date between 18 months and 12 months'
  })
  discount() {
    this.removeOwnerOlderThan18Month();
    this.discountOff20PercentCarRegistrationBetween12And18Month();
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  delete(@Param('id') id: string) {
    return this.carsService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({type: Car})
  @ApiNotFoundResponse({description: 'No car has been found.'})
  get(@Param('id') id: string): Promise<Car> {
    return this.carsService.get(id);
  }

  @Get()
  @ApiOkResponse({type: [Car]})
  list(): Promise<Car[]> {
    return this.carsService.list();
  }

  @Get(':id/manufacturer')
  @ApiOkResponse({type: Manufacturer})
  @ApiNotFoundResponse({description: 'No car has been found.'})
  async manufacturer(@Param('id') id: string): Promise<Manufacturer> {
    const car = await this.carsService.get(id);

    return car.manufacturer;
  }

  @Put(':id')
  @ApiOkResponse({type: Car})
  @ApiNotFoundResponse({ description: 'The manufacturer or owners has not found.'})
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