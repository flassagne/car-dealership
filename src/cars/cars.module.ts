import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity'
import {ManufacturersModule} from '../manufacturers/manufacturers.module'
import {ManufacturersService} from '../manufacturers/manufacturers.service';
import {Owner} from '../owners/owners.entity'
import {OwnersModule} from '../owners/owners.module'
import {OwnersService} from '../owners/owners.service';

import {CarsController} from './cars.controller';
import {Car} from './cars.entity';
import {CarsService} from './cars.service';

@Module({
  imports: [
    ManufacturersModule,
    OwnersModule,
    TypeOrmModule.forFeature([Car, Owner, Manufacturer]),
  ],
  controllers: [CarsController],
  providers: [CarsService, OwnersService, ManufacturersService]
})
export class CarsModule {
}
