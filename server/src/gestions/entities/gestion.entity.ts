import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Etudiant } from '../../etudiants/entities/etudiant.entity';

@Entity({ name: 'gestions' })
export class Gestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true})
    EnNo: string;

    @Column({ type: 'timestamp' })
    DateTime: Date;

    @ManyToOne(() => Etudiant, etudiant => etudiant.bio, { eager: true })
    @JoinColumn({ name: 'EnNo', referencedColumnName: 'bio' })
    etudiant: Etudiant;
}
