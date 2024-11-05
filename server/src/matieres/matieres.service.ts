/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Matiere } from './entities/matiere.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatieresService {
  constructor(
    @InjectRepository(Matiere)
    private readonly matieresRepository: Repository<Matiere>
  ) {}

  async create(createMatiereDto: CreateMatiereDto) {
    const matiere = this.matieresRepository.create(createMatiereDto);
    return await this.matieresRepository.save(matiere);
  }

  async findAll() {
    return await this.matieresRepository.find();
  }

  async findOne(id: number) {
    return await this.matieresRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMatiereDto: UpdateMatiereDto) {
    const matiere = await this.findOne(id);

    if (!matiere) {
      throw new NotFoundException();
    }

    Object.assign(matiere, updateMatiereDto);
    return await this.matieresRepository.save(matiere);
  }

  async remove(id: number) {
    const matiere = await this.findOne(id);
    if (!matiere) {
      throw new NotFoundException();
    }
    return await this.matieresRepository.remove(matiere);
  }
}
