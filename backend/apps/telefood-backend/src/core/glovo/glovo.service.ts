import { Injectable } from '@nestjs/common';
import { CreateGlovoDto } from './dto/create-glovo.dto';
import { UpdateGlovoDto } from './dto/update-glovo.dto';

@Injectable()
export class GlovoService {
  create(createGlovoDto: CreateGlovoDto) {
    return 'This action adds a new glovo';
  }

  findAll() {
    return `This action returns all glovo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glovo`;
  }

  update(id: number, updateGlovoDto: UpdateGlovoDto) {
    return `This action updates a #${id} glovo`;
  }

  remove(id: number) {
    return `This action removes a #${id} glovo`;
  }
}
