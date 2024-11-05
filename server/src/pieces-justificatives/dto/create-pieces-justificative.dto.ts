/* eslint-disable prettier/prettier */
import { Etudiant } from "src/etudiants/entities/etudiant.entity";

export class CreatePiecesJustificativeDto {
    description: string;
    dateDebut: Date;
    dateFin: Date;
    nom: string;
    etudiant: Etudiant;
}
