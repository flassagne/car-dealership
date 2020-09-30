import {IsDate, IsDateString, IsString} from 'class-validator';

export class OwnerDto {
  @IsString() name: string;
  @IsDateString() purchaseDate: Date;
}