import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { Etudiant } from 'src/etudiants/entities/etudiant.entity';

@Controller('gestions')
export class GestionsController {
  constructor(private readonly gestionsService: GestionsService) {}

  @Post()
  create(@Body() createGestionDto: CreateGestionDto) {
    return this.gestionsService.create(createGestionDto);
  }

  @Get()
  findAll() {
    return this.gestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGestionDto: UpdateGestionDto) {
    return this.gestionsService.update(+id, updateGestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gestionsService.remove(+id);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('A file is required for import');
    }

    const filePath = path.join(__dirname, '../../uploads', file.originalname);

    // Enregistrer temporairement le fichier uploadé
    fs.writeFileSync(filePath, file.buffer);

    try {
      // Appeler le service pour importer les données du fichier
      await this.gestionsService.importFromFile(filePath);
      return { message: 'Data imported successfully' };
    } catch (error) {
      throw new Error(`Failed to import data: ${error.message}`);
    } finally {
      // Supprimer le fichier temporaire après importation
      fs.unlinkSync(filePath);
    }
  }

  @Get('date/:date')
  async findByDate(@Param('date') date: string) {
    return this.gestionsService.findByDate(date);
  }

  @Get('absents/date/:date')
async findAbsentsByDate(@Param('date') date: string) {
  return this.gestionsService.findAbsentsByDate(date);
}

@Get('absents/range')
async findAbsentsInRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string, @Query('niveau') niveau: string, @Query('parcours') parcours: string): Promise<Etudiant[]> {
    return await this.gestionsService.findAbsentsByDateRange(startDate, endDate, niveau, parcours);
}
@Get('absents/datetime')
async findAbsentsByDateTime(
  @Query('datetime') datetime: string,
  @Query('niveau') niveau: string = 'TOUS',
  @Query('parcours') parcours: string = 'TOUS',
) {
  console.log('DateTime:', datetime);
  console.log('Niveau:', niveau);
  console.log('Parcours:', parcours);

  // Validation de la date et heure
  if (!datetime || isNaN(Date.parse(datetime))) {
    throw new BadRequestException('La date et l\'heure doivent être valides');
  }

  try {
    // Appelle le service pour récupérer les étudiants absents
    return await this.gestionsService.findAbsentsByDateTime(datetime, niveau, parcours);
  } catch (error) {
    console.error('Erreur dans findAbsentsByDateTime:', error);
    throw new BadRequestException('Erreur lors de la récupération des étudiants absents');
  }
}

}
