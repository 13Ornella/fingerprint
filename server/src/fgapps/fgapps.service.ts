/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFgappDto } from './dto/create-fgapp.dto';
import { UpdateFgappDto } from './dto/update-fgapp.dto';
import { Repository } from 'typeorm';
import { Fgapp } from './entities/fgapp.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FgappsService {
  constructor(
    @InjectRepository(Fgapp)
    private readonly fgappsRepository:
    Repository<Fgapp>
  ){

  }

  async create(createFgappDto: CreateFgappDto) {
    const fgapp = this.fgappsRepository.create
    (createFgappDto);

    return await this.fgappsRepository.save(fgapp);
  }

  async findAll() {
    return await this.fgappsRepository.find();
  }

  async findOne(id: number) {
    return await this.fgappsRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateFgappDto: UpdateFgappDto) {
    const fgapp = await this.findOne(id);

    if(!fgapp){
      throw new NotFoundException()
    }

    Object.assign(fgapp, updateFgappDto);

    return await this.fgappsRepository.save(fgapp);
  }

  async remove(id: number) {
    const fgapp = await this.findOne(id);
    if(!fgapp){
      throw new NotFoundException();
    }

    return await this.fgappsRepository.remove(fgapp);
  }
}
