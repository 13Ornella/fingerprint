/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiecesJustificativesService } from './pieces-justificatives.service';
import { PiecesJustificativesController } from './pieces-justificatives.controller';
import { PieceJustificative } from './entities/pieces-justificative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PieceJustificative])],
  controllers: [PiecesJustificativesController],
  providers: [PiecesJustificativesService],
})
export class PiecesJustificativesModule {}
