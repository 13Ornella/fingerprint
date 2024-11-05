import { Professeur } from "src/professeurs/entities/professeur.entity";

/* eslint-disable prettier/prettier */
export class CreateMatiereDto {
    nom : string;
    niveau : string;
    heureDebut : string;
    heureFin : string;
    professeur : Professeur;
}
