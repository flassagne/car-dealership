import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ManufacturersController} from './manufacturers.controller';
import {Manufacturer} from './manufacturers.entity';
import {ManufacturersService} from './manufacturers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  providers: [ManufacturersService],
  controllers: [ManufacturersController],
  exports: [ManufacturersService]
})
export class ManufacturersModule {
}
