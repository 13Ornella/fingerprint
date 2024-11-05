/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEtudiantDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsNumber()
  matricule: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  niveau: string;

  @IsNotEmpty()
  @IsString()
  parcours: string;

  @IsNotEmpty()
  @IsString()
  bio: string;
}
