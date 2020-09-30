import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';

import {OwnerDto} from './dto/owner.dto';
import {Owner} from './owners.entity';
import {OwnersService} from './owners.service';

@Controller('owners')
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @Post()
  create(@Body(new ValidationPipe()) ownerDto: OwnerDto): Promise<Owner> {
    return this.ownersService.create(ownerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.ownersService.delete(id);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Owner> {
    return this.ownersService.get(id);
  }

  @Get()
  list(): Promise<Owner[]> {
    return this.ownersService.list();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() ownerDto: OwnerDto): Promise<Owner> {
    return this.ownersService.update(id, ownerDto);
  }
}
