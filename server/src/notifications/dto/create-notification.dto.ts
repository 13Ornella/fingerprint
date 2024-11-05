/* eslint-disable prettier/prettier */
import { Etudiant } from "src/etudiants/entities/etudiant.entity";
import { Professeur } from "src/professeurs/entities/professeur.entity";

export class CreateNotificationDto {
    description : string;
    objet : string;
    etudiant : Etudiant;
    professeur : Professeur;
}