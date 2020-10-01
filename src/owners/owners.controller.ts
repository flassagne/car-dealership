import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {OwnerDto} from './dto/owner.dto';
import {Owner} from './owners.entity';
import {OwnersService} from './owners.service';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @Post()
  @ApiCreatedResponse({type: Owner})
  create(@Body(new ValidationPipe()) ownerDto: OwnerDto): Promise<Owner> {
    return this.ownersService.create(ownerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  delete(@Param('id') id: string): Promise<void> {
    return this.ownersService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({type: Owner})
  @ApiNotFoundResponse({description: 'No owner has been found.'})
  get(@Param('id') id: string): Promise<Owner> {
    return this.ownersService.get(id);
  }

  @Get()
  @ApiOkResponse({type: [Owner]})
  list(): Promise<Owner[]> {
    return this.ownersService.list();
  }

  @Put(':id')
  @ApiOkResponse({type: Owner})
  @ApiNotFoundResponse({description: 'No owner has been found.'})
  update(@Param('id') id: string, @Body() ownerDto: OwnerDto): Promise<Owner> {
    return this.ownersService.update(id, ownerDto);
  }
}
