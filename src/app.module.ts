import {Module} from '@nestjs/common';

import {CarsModule} from './cars/cars.module';
import {DatabaseModule} from './database/database.module';
import {ManufacturersModule} from './manufacturers/manufacturers.module';
import {OwnersModule} from './owners/owners.module';

@Module({
  imports: [
    OwnersModule,
    ManufacturersModule,
    CarsModule,
    DatabaseModule,
  ],
})
export class AppModule {
}
