// Hard exudates (HE) present anywhere

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_11' })
export class Table11 {

    @PrimaryGeneratedColumn('uuid')
    table_11_id: string

    @Column({ type: 'integer' })
    value: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}