import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Car} from '../cars/cars.entity';

@Entity()
export class Owner {
  @ApiProperty() @PrimaryGeneratedColumn('uuid') id: string;

  @ApiProperty() @Column() name: string;

  @ApiProperty() @Column() purchaseDate: Date;

  @ManyToOne(type => Car, car => car.owners, {
    onDelete: 'CASCADE',
  })
  car: Car;
}
