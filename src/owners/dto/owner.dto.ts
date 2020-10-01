import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsString} from 'class-validator';

export class OwnerDto {
  @ApiProperty({
    description: 'The car\' s owner name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The purchase date',
  })
  @IsDateString()
  purchaseDate: Date;
}