import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableHeDto } from 'src/table-dto/create-table-he.dto';
import { UpdateTableHeDto } from 'src/table-dto/update-table-he.dto';
import { Table12 } from './table-12.entity';
import { Table12Repository } from './table-12.repository';

@Injectable()
export class Table12Service {
    constructor(
        @InjectRepository(Table12Repository)
        private table12Repository: Table12Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableHeDto: CreateTableHeDto): Promise<Table12> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_2DD, lower_1DD, cannot_grade } = createTableHeDto
            let value: number

            if(lower_2DD) {
                value = 0
            } else if(lower_1DD) {
                value = 1
            } else if(cannot_grade) {
                value = 2
            } else {
                value = 3
            }

            const table = this.table12Repository.create({ value, eye_photo: photo })
            return await this.table12Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table12> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table12Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableHeDto: UpdateTableHeDto): Promise<Table12> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table12Repository.findOne({ where: { eye_photo } })
            const { lower_2DD, lower_1DD, cannot_grade } = updateTableHeDto

            if(lower_2DD) {
                table.value = 0
            } else if(lower_1DD) {
                table.value = 1
            } else if(cannot_grade) {
                table.value = 2
            } else {
                throw new BadRequestException()
            }

            return await this.table12Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table12Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table12Repository.delete(table.table_12_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
