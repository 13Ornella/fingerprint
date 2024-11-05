/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'etudiants' })
export class Etudiant {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    matricule: number;

    @Column({ type: 'text', nullable: false })
    nom: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @Column({ type: 'text', nullable: false })
    niveau: string;

    @Column({ type: 'text', nullable: false })
    parcours: string;
    
    @Column({ type: 'text', nullable: true, unique: true }) // Nouvelle colonne pour bio avec contrainte unique
    bio: string;
}
