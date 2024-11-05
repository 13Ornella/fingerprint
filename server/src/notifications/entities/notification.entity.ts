/* eslint-disable prettier/prettier */
import { Etudiant } from "src/etudiants/entities/etudiant.entity";
import { Professeur } from "src/professeurs/entities/professeur.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'notifications' })
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 10, nullable: false })
    objet: string;

    @ManyToOne(() => Etudiant, etudiant => etudiant.id)
    @JoinColumn({ name: 'etudiant_id' })
    etudiant: Etudiant;

    @ManyToOne(() => Professeur, professeur => professeur.id)
    @JoinColumn({ name: 'professeur_id' })
    professeur: Professeur;
}