/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { UpdateParcourDto } from './dto/update-parcour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcours } from './entities/parcour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParcoursService {
  constructor(
    @InjectRepository(Parcours)
    private readonly parcoursRepository: Repository<Parcours>
  ) {}

  async create(createParcoursDto: CreateParcourDto) {
    const parcours = this.parcoursRepository.create(createParcoursDto);
    return await this.parcoursRepository.save(parcours);
  }

  async findAll() {
    return await this.parcoursRepository.find();
  }

  async findOne(id: number) {
    return await this.parcoursRepository.findOne({ where: { id } });
  }

  async update(id: number, updateParcoursDto: UpdateParcourDto) {
    const parcours = await this.findOne(id);

    if (!parcours) {
      throw new NotFoundException();
    }

    Object.assign(parcours, updateParcoursDto);
    return await this.parcoursRepository.save(parcours);
  }

  async remove(id: number) {
    const parcours = await this.findOne(id);
    if (!parcours) {
      throw new NotFoundException();
    }
    return await this.parcoursRepository.remove(parcours);
  }
}