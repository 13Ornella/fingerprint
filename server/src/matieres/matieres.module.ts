/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matiere } from './entities/matiere.entity';
import { MatieresService } from './matieres.service';
import { MatieresController } from './matieres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Matiere])],
  controllers: [MatieresController],
  providers: [MatieresService],
})
export class MatieresModule {}
