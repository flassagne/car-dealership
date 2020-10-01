import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class ManufacturerDto {
  @ApiProperty({
    description: 'The car\'s manufacturer name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone number\'s manufacturer',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The siret number\'s manufacturer',
  })
  @IsNumber()
  siret: number;
}