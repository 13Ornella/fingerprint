import { Module } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { GestionsController } from './gestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gestion } from './entities/gestion.entity';
import { EtudiantsModule } from '../etudiants/etudiants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gestion]),
  EtudiantsModule],
  controllers: [GestionsController],
  providers: [GestionsService],
})
export class GestionsModule {}
