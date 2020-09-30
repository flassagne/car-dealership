import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
      entities: [Owner]
    }),
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
