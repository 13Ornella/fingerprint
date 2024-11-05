/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class EtudiantsService {
  constructor(
    @InjectRepository(Etudiant)
    private readonly etudiantsRepository: Repository<Etudiant>,
  ) {}

  async create(createEtudiantDto: CreateEtudiantDto) {
    const etudiant = this.etudiantsRepository.create(createEtudiantDto);
    return await this.etudiantsRepository.save(etudiant);
  }

  async findAll() {
    return await this.etudiantsRepository.find();
  }

  async findOne(id: number) {
    return await this.etudiantsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateEtudiantDto: UpdateEtudiantDto) {
    const etudiant = await this.findOne(id);

    if (!etudiant) {
      throw new NotFoundException();
    }

    Object.assign(etudiant, updateEtudiantDto);

    return await this.etudiantsRepository.save(etudiant);
  }

  async remove(id: number) {
    const etudiant = await this.findOne(id);
    if (!etudiant) {
      throw new NotFoundException();
    }
    return await this.etudiantsRepository.remove(etudiant);
  }

  // Nouvelle méthode pour extraire "EnNo" depuis un fichier et le sauvegarder dans la base de données
  async extractAndSaveEnNo(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let lineCount = 0;
    for await (const line of rl) {
        if (lineCount > 0) { // Ignorer la première ligne si c'est un en-tête
            const columns = line.split('\t').map(col => col.trim());
            if (columns.length >= 3) {
                const enNo = parseInt(columns[2]);
                const nom = columns[3];

                // Vérifier si le "bio" existe déjà
                const existingEtudiant = await this.etudiantsRepository.findOne({ where: { bio: enNo.toString() } });
                if (existingEtudiant) {
                    console.log(`L'étudiant avec le bio ${enNo} existe déjà. Ignorer l'importation.`);
                    lineCount++;
                    continue; // Passer à la ligne suivante
                }

                // Crée un nouvel étudiant avec l'id "EnNo" extrait
                const etudiant = new Etudiant();
                etudiant.matricule = enNo; // Assurez-vous de définir matricule ou d'autres colonnes si nécessaire
                etudiant.bio = enNo.toString(); // Enregistrer la valeur de enNo dans bio

                // Ajoutez des valeurs par défaut pour les autres colonnes si nécessaire
                etudiant.nom = nom;
                etudiant.email = "";
                etudiant.niveau = "";
                etudiant.parcours = "";
                
                // Sauvegarde dans la base de données
                await this.etudiantsRepository.save(etudiant);
            }
        }
        lineCount++;
    }
}

}
