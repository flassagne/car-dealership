import {IsInt, IsNumber, IsString} from 'class-validator';

export class ManufacturerDto {
  @IsString() name: string;
  @IsString() phone: string;
  @IsNumber() siret: number;
}