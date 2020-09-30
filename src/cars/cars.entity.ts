import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {Owner} from '../owners/owners.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() price: number;

  @OneToOne(type => Manufacturer, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  manufacturer: Manufacturer;

  @Column() firstRegistrationDate: Date;

  @OneToMany(type => Owner, owner => owner.car, {
    eager: true,
  })
  owners: Owner[];
}