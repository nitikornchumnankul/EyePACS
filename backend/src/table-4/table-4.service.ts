import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableHmaDto } from 'src/table-dto/create-table-hma.dto';
import { UpdateTableHmaDto } from 'src/table-dto/update-table-hma.dto';
import { Table4 } from './table-4.entity';
import { Table4Repository } from './table-4.repository';

@Injectable()
export class Table4Service {
    constructor(
        @InjectRepository(Table4Repository)
        private table4Repository: Table4Repository,
        private eyePhotosService: EyePhotosService
    ) {}

    async createTable(eye_photo_id: string, createTableHmaDto: CreateTableHmaDto): Promise<Table4> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_2a, upper_2a, cannot_grade } = createTableHmaDto
            let value: number

            if(lower_2a) {
                value = 0
            } else if(upper_2a) {
                value = 1
            } else if(cannot_grade) {
                value = 2
            } else {
                value = 3
            }

            const table = this.table4Repository.create({ value, eye_photo: photo })
            return await this.table4Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table4> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table4Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableHmaDto: UpdateTableHmaDto): Promise<Table4> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table4Repository.findOne({ where: { eye_photo } })
            const { lower_2a, upper_2a, cannot_grade } = updateTableHmaDto

            if(lower_2a) {
                table.value = 0
            } else if(upper_2a) {
                table.value = 1
            } else if(cannot_grade) {
                table.value = 2
            } else {
                throw new BadRequestException()
            }

            return await this.table4Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table4Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table4Repository.delete(table.table_4_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
