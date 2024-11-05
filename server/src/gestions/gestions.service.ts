import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Not, Repository } from 'typeorm';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { Gestion } from './entities/gestion.entity';
import { Etudiant } from '../etudiants/entities/etudiant.entity';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class GestionsService {
  constructor(
    @InjectRepository(Gestion)
    private gestionsRepository: Repository<Gestion>,
    @InjectRepository(Etudiant)
    private readonly etudiantRepository: Repository<Etudiant>,
  ) {}

  async create(createGestionDto: CreateGestionDto): Promise<Gestion> {
    const newGestion = this.gestionsRepository.create(createGestionDto);
    return await this.gestionsRepository.save(newGestion);
  }

  findAll(): Promise<Gestion[]> {
    return this.gestionsRepository.find();
  }

  findOne(id: number): Promise<Gestion> {
    return this.gestionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGestionDto: UpdateGestionDto): Promise<Gestion> {
    await this.gestionsRepository.update(id, updateGestionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gestionsRepository.delete(id);
  }

  async importFromFile(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const columns = line.split('\t').map(col => col.trim());

      if (columns.length >= 7) {
        const enNo = parseInt(columns[2]);
        const dateTimeStr = columns[6];
        const dateTime = new Date(dateTimeStr);

      const gestion = new Gestion();
      gestion.EnNo = enNo.toString();
      gestion.DateTime = dateTime;

       /* const createGestionDto = new CreateGestionDto();
        createGestionDto.EnNo = enNo.toString();
        createGestionDto.DateTime = dateTime;

        await this.create(createGestionDto);*/
        await this.gestionsRepository.save(gestion);
      }
    }
  }

  async findByDate(date: string): Promise<Gestion[]> {
    // Convertir la chaîne de date en début et fin de la journée
    const dateObj = new Date(date);
    const startDate = new Date(dateObj.setHours(0, 0, 0, 0));
    const endDate = new Date(dateObj.setHours(23, 59, 59, 999));

    return this.gestionsRepository.find({
      where: { DateTime: Between(startDate, endDate) },
      relations: ['etudiant'],
    });
  }

  async findAbsentsByDate(date: string): Promise<Etudiant[]> {
    // Convertir la date pour obtenir le début et la fin de la journée
    const dateObj = new Date(date);
    const startDate = new Date(dateObj.setHours(0, 0, 0, 0));
    const endDate = new Date(dateObj.setHours(23, 59, 59, 999));
  
    // Récupérer les étudiants ayant checké dans `gestions` pour cette date
    const presents = await this.gestionsRepository.find({
      where: { DateTime: Between(startDate, endDate) },
      select: ['EnNo'],
    });
    const presentEnNos = presents.map(gestion => gestion.EnNo);
  
    // Récupérer les étudiants dont le `bio` ne figure pas dans la liste des `EnNo` présents
    return this.gestionsRepository.manager.getRepository(Etudiant).find({
      where: {
        bio: Not(In(presentEnNos)),
      },
    });
  }

  async findAbsentsByDateRange(startDate: string, endDate: string, niveau: string, parcours: string): Promise<Etudiant[]> {
    // Validation de la date pour s'assurer que les chaînes de dates sont valides
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new BadRequestException('Les dates fournies ne sont pas valides');
    }
  
    // Ajuster les heures pour avoir le début et la fin de la journée
    const start = new Date(startDateObj.setHours(0, 0, 0, 0));
    const end = new Date(endDateObj.setHours(23, 59, 59, 999));
  
    // Obtenez les `EnNo` des étudiants présents dans la plage de dates
    const presents = await this.gestionsRepository.find({
      where: { DateTime: Between(start, end) },
      select: ['EnNo'],
    });
    const presentEnNos = presents.map(gestion => gestion.EnNo);
  
    // Récupérer les étudiants absents en filtrant par niveau et parcours
    const absentStudents = await this.gestionsRepository.manager.getRepository(Etudiant).find({
      where: {
        bio: Not(In(presentEnNos)),
        ...(niveau !== 'TOUS' ? { niveau } : {}),
        ...(parcours !== 'TOUS' ? { parcours } : {}),
      },
    });
  
    return absentStudents;
  }

  async findAbsentsByDateTime(datetime: string, niveau: string, parcours: string): Promise<Etudiant[]> {
    // Vérification du format de datetime
    const dateObj = new Date(datetime);
    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Le format de DateTime est invalide');
    }
  
    // Étape 1 : Récupère les étudiants ayant une empreinte digitale à la date et l'heure spécifiées
    const studentsWithGestion = await this.gestionsRepository
      .createQueryBuilder('gestion')
      .select('gestion.etudiant')
      .where('gestion.DateTime = :datetime', { datetime: dateObj }) // Utilisez l'objet Date ici
      .getMany();
  
    // Afficher les résultats dans la console
    console.log('Étudiants avec gestion:', studentsWithGestion);
  
    // Extraire les IDs des étudiants présents dans "gestion"
    const presentStudentIds = studentsWithGestion.map((gestion) => {
      console.log('ID de l\'étudiant:', gestion.etudiant); // Afficher chaque étudiant dans la console
      return gestion.etudiant;
    });
  
    // Étape 2 : Récupère les étudiants absents à cette date et heure
    const queryBuilder = this.etudiantRepository.createQueryBuilder('etudiant');
  
    // Si presentStudentIds est vide, récupérez tous les étudiants
    if (presentStudentIds.length === 0) {
      return await queryBuilder.getMany();
    }
  
    queryBuilder.where('etudiant.id NOT IN (:...presentStudentIds)', { presentStudentIds });
  
    // Applique les filtres de niveau et de parcours si nécessaires
    if (niveau !== 'TOUS') {
      queryBuilder.andWhere('etudiant.niveau = :niveau', { niveau });
    }
    if (parcours !== 'TOUS') {
      queryBuilder.andWhere('etudiant.parcours = :parcours', { parcours });
    }
  
    // Retourne la liste des étudiants absents
    return await queryBuilder.getMany();
  }
  
  
  
  
}
