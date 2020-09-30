import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column() purchaseDate: Date;
}
