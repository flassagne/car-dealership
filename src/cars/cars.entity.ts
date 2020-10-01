import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Manufacturer} from '../manufacturers/manufacturers.entity';
import {Owner} from '../owners/owners.entity';

@Entity()
export class Car {
  @ApiProperty() @PrimaryGeneratedColumn('uuid') id: string;

  @ApiProperty() @Column() price: number;

  @ApiProperty()
  @OneToOne(type => Manufacturer, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  manufacturer: Manufacturer;

  @ApiProperty() @Column() firstRegistrationDate: Date;

  @ApiProperty({type: () => [Owner]})
  @OneToMany(type => Owner, owner => owner.car, {
    eager: true,
  })
  owners: Owner[];
}