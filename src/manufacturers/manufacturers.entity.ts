import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Manufacturer {
  @ApiProperty() @PrimaryGeneratedColumn('uuid') id: string;
  @ApiProperty() @Column() name: string;
  @ApiProperty() @Column() phone: string;
  @ApiProperty() @Column('bigint') siret: number;
}