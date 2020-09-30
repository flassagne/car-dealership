import {IsArray, IsDateString, IsNumber, IsString} from 'class-validator'

export class CarDto {
  @IsString() manufacturerID: string;
  @IsNumber() price: number;
  @IsDateString() firstRegistrationDate: Date;
  @IsArray() ownersID: string[];
}
