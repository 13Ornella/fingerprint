/* eslint-disable prettier/prettier */
import { Etudiant } from "src/etudiants/entities/etudiant.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'pieces_justificatives' })
export class PieceJustificative {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'timestamp', nullable: false })
    dateDebut: Date;

    @Column({ type: 'timestamp', nullable: false })
    dateFin: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nom: string;

    @ManyToOne(() => Etudiant, etudiant => etudiant.id)
    @JoinColumn({ name: 'idEtudiant' })
    etudiant: Etudiant;

    @Column({ type: 'integer', nullable: false })
    column: number;
}