import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {OwnersController} from './owners.controller';
import {Owner} from './owners.entity';
import {OwnersService} from './owners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService]
})
export class OwnersModule {
}
