/* eslint-disable prettier/prettier */
import { Professeur } from "src/professeurs/entities/professeur.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'matieres' })
export class Matiere {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    nom: string;

    @Column({ type: 'text', nullable: false })
    niveau: string;

    @Column({ type: 'time', nullable: false })
    heureDebut: string;

    @Column({ type: 'time', nullable: false })
    heureFin: string;

    @ManyToOne(() => Professeur, professeur => professeur.matieres)
    @JoinColumn({ name: 'professeur_id' })
    professeur: Professeur;
}
