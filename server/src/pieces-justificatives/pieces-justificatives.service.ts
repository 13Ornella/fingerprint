/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PieceJustificative } from './entities/pieces-justificative.entity';
import { CreatePiecesJustificativeDto } from './dto/create-pieces-justificative.dto';
import { UpdatePiecesJustificativeDto } from './dto/update-pieces-justificative.dto';

@Injectable()
export class PiecesJustificativesService {
  constructor(
    @InjectRepository(PieceJustificative)
    private readonly piecesJustificativesRepository: Repository<PieceJustificative>
  ) {}

  async create(createPieceJustificativeDto: CreatePiecesJustificativeDto) {
    const pieceJustificative = this.piecesJustificativesRepository.create(createPieceJustificativeDto);
    return await this.piecesJustificativesRepository.save(pieceJustificative);
  }

  async findAll() {
    return await this.piecesJustificativesRepository.find();
  }

  async findOne(id: number) {
    return await this.piecesJustificativesRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePieceJustificativeDto: UpdatePiecesJustificativeDto) {
    const pieceJustificative = await this.findOne(id);

    if (!pieceJustificative) {
      throw new NotFoundException();
    }

    Object.assign(pieceJustificative, updatePieceJustificativeDto);
    return await this.piecesJustificativesRepository.save(pieceJustificative);
  }

  async remove(id: number) {
    const pieceJustificative = await this.findOne(id);
    if (!pieceJustificative) {
      throw new NotFoundException();
    }
    return await this.piecesJustificativesRepository.remove(pieceJustificative);
  }
}
