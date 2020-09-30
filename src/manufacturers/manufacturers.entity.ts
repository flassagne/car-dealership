import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column() phone: string;
  @Column('bigint') siret: number;
}