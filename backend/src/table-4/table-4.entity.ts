// Herrmorhaqes with or without MA (HMA) 2a

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_4' })
export class Table4 {

    @PrimaryGeneratedColumn('uuid')
    table_4_id: string

    // <2a
    @Column({ type: 'integer' })
    value: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}