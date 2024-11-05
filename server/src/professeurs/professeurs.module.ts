/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professeur } from './entities/professeur.entity';
import { ProfesseursService } from './professeurs.service';
import { ProfesseursController } from './professeurs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professeur])],
  controllers: [ProfesseursController],
  providers: [ProfesseursService],
})
export class ProfesseursModule {}
