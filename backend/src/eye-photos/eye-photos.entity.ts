import { Status } from "src/enum/status.enum";
import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity({ name: 'eye_photos' })
export class EyePhotos {

    @PrimaryColumn()
    eye_photo_id: string

    @Column()
    path: string

    @Column({ type: 'integer', default: 2 })
    eyeside: number

    @Column({ default: Status.inPorgress })
    status: Status

    @Column({ default: '' })
    comments: String

    @Column({ default: false })
    remarks: boolean
    @CreateDateColumn()
    created: Date
}