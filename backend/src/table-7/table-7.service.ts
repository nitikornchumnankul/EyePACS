import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table7 } from './table-7.entity';
import { Table7Repository } from './table-7.repository';

@Injectable()
export class Table7Service {
    constructor(
        @InjectRepository(Table7Repository)
        private table7Repository: Table7Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableDto: CreateTableDto): Promise<Table7> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { yes, cannot_grade } = createTableDto
            let value: number

            if(yes) {
                value = 1
            } else if(cannot_grade) {
                value = 0
            } else {
                value = 3
            }

            const table = this.table7Repository.create({ value, eye_photo: photo })
            return await this.table7Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table7> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table7Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableDto: UpdateTableDto): Promise<Table7> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table7Repository.findOne({ where: { eye_photo } })
            const { yes, cannot_grade } = updateTableDto

            if(yes) {
                table.value = 1
            } else if(cannot_grade) {
                table.value = 0
            } else {
                throw new BadRequestException()
            }

            return await this.table7Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table7Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table7Repository.delete(table.table_7_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
