/* eslint-disable prettier/prettier */
import { Matiere } from "src/matieres/entities/matiere.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity({ name: 'professeurs' })
export class Professeur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    nom: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @OneToMany(() => Matiere, matiere => matiere.professeur)
    matieres: Matiere[];
}
