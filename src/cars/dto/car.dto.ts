import {ApiProperty} from '@nestjs/swagger'
import {IsArray, IsDateString, IsNumber, IsString} from 'class-validator'

export class CarDto {
  @ApiProperty({
    description: 'The car\'s manufacturer ID',
  })
  @IsString()
  manufacturerID: string;

  @ApiProperty({
    description: 'The car\'s price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The car\'s first registration date',
  })
  @IsDateString()
  firstRegistrationDate: Date;

  @ApiProperty({
    description: 'The car\'s owners ID',
  })
  @IsArray()
  ownersID: string[];
}
