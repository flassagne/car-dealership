import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindConditions, FindManyOptions, Raw, Repository} from 'typeorm';

import {OwnerDto} from './dto/owner.dto';
import {Owner} from './owners.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository:
                  Repository<Owner>) {}

  create(ownerDto: OwnerDto): Promise<Owner> {
    const owner = new Owner();

    owner.name = ownerDto.name
    owner.purchaseDate = ownerDto.purchaseDate

    return this.ownersRepository.save(owner);
  }

  async delete(id: string): Promise<void> {
    await this.ownersRepository.delete(id);
  }

  async get(id: string): Promise<Owner> {
    const owner = await this.ownersRepository.findOne(id);

    if (!owner) {
      throw new NotFoundException('No owner found!');
    }

    return owner;
  }

  list(conditions?: FindConditions<Owner>): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  async update(id: string, ownerDto: OwnerDto): Promise<Owner> {
    const owner = await this.ownersRepository.findOne(id);

    if (!owner) {
      throw new NotFoundException('No owner found!');
    }

    owner.name = ownerDto.name
    owner.purchaseDate = ownerDto.purchaseDate;

    return this.ownersRepository.save(owner);
  }
}
