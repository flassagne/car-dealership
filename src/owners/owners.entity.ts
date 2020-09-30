import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Car} from '../cars/cars.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column() purchaseDate: Date;

  @ManyToOne(type => Car, car => car.owners, {
    onDelete: 'CASCADE',
  })
  car: Car;
}
