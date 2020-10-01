import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {ManufacturerDto} from './dto/manufacturer.dto';
import {Manufacturer} from './manufacturers.entity';
import {ManufacturersService} from './manufacturers.service';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The car has been successfully created.',
    type: Manufacturer
  })
  create(@Body(new ValidationPipe()) manufacturerDto: ManufacturerDto) {
    return this.manufacturersService.create(manufacturerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  delete(@Param('id') id: string) {
    return this.manufacturersService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({type: Manufacturer})
  @ApiNotFoundResponse({description: 'No manufacturer has been found.'})
  get(@Param('id') id: string) {
    return this.manufacturersService.get(id);
  }

  @Get()
  @ApiOkResponse({type: [Manufacturer]})
  list() {
    return this.manufacturersService.list();
  }

  @Put(':id')
  @ApiOkResponse({type: Manufacturer})
  @ApiNotFoundResponse({description: 'No manufacturer has been found.'})
  update(
      @Param('id') id: string,
      @Body(new ValidationPipe()) manufacturerDto: ManufacturerDto) {
    return this.manufacturersService.update(id, manufacturerDto);
  }
}
