import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';

import {ManufacturerDto} from './dto/manufacturer.dto';
import {ManufacturersService} from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @Post()
  create(@Body(new ValidationPipe()) manufacturerDto: ManufacturerDto) {
    return this.manufacturersService.create(manufacturerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.manufacturersService.delete(id);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.manufacturersService.get(id);
  }

  @Get()
  list() {
    return this.manufacturersService.list();
  }

  @Put(':id')
  update(
      @Param('id') id: string,
      @Body(new ValidationPipe()) manufacturerDto: ManufacturerDto) {
    return this.manufacturersService.update(id, manufacturerDto);
  }
}
