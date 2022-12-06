// Definite Venous Beading 6a

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_5' })
export class Table5 {
    
    @PrimaryGeneratedColumn('uuid')
    table_5_id: string

    @Column({ type: 'integer' })
    value: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}