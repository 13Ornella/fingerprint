/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('etudiants')
export class EtudiantsController {
  constructor(private readonly etudiantsService: EtudiantsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createEtudiantDto: CreateEtudiantDto) {
    return this.etudiantsService.create(createEtudiantDto);
  }

  @Get()
  findAll() {
    return this.etudiantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etudiantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantsService.update(+id, updateEtudiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etudiantsService.remove(+id);
  }

   // Endpoint pour gérer le téléchargement de fichier
   @Post('upload')
   @UseInterceptors(FileInterceptor('file', {
     storage: diskStorage({
       destination: './uploads', // Chemin du dossier où enregistrer les fichiers
       filename: (req, file, cb) => {
         const uniqueSuffix = Date.now() + extname(file.originalname); // Générer un nom de fichier unique
         cb(null, file.fieldname + '-' + uniqueSuffix);
       },
     }),
   }))
   async uploadFile(@UploadedFile() file: Express.Multer.File) {
     if (!file) {
       throw new BadRequestException('Aucun fichier n\'a été téléchargé.');
     }
 
     const filePath = file.path; // Cela devrait maintenant contenir le chemin du fichier enregistré
     await this.etudiantsService.extractAndSaveEnNo(filePath); // Traitement du fichier
     return { message: 'Fichier traité avec succès' };
   }
}
