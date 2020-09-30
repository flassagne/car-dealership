import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Manufacturer} from './manufacturers/manufacturers.entity';
import {ManufacturersModule} from './manufacturers/manufacturers.module';
import {Owner} from './owners/owners.entity';
import {OwnersModule} from './owners/owners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      entities: [Owner, Manufacturer]
    }),
    OwnersModule,
    ManufacturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
