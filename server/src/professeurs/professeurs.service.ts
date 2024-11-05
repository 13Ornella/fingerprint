/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professeur } from './entities/professeur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesseursService {
  constructor(
    @InjectRepository(Professeur)
    private readonly professeursRepository: Repository<Professeur>
  ) {}

  async create(createProfesseurDto: CreateProfesseurDto) {
    const professeur = this.professeursRepository.create(createProfesseurDto);
    return await this.professeursRepository.save(professeur);
  }

  async findAll() {
    return await this.professeursRepository.find();
  }

  async findOne(id: number) {
    return await this.professeursRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProfesseurDto: UpdateProfesseurDto) {
    const professeur = await this.findOne(id);

    if (!professeur) {
      throw new NotFoundException();
    }

    Object.assign(professeur, updateProfesseurDto);
    return await this.professeursRepository.save(professeur);
  }

  async remove(id: number) {
    const professeur = await this.findOne(id);
    if (!professeur) {
      throw new NotFoundException();
    }
    return await this.professeursRepository.remove(professeur);
  }
}
