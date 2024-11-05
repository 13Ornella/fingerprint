/* eslint-disable prettier/prettier */
import { Matiere } from "src/matieres/entities/matiere.entity";

export class CreateProfesseurDto {
    nom: string;
    email: string;
    matieres: Matiere[];
}
