import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableIrmaDto } from 'src/table-dto/create-table-irma.dto';
import { UpdateTableIrmaDto } from 'src/table-dto/update-table-irma.dto';
import { Table6 } from './table-6.entity';
import { Table6Repository } from './table-6.repository';

@Injectable()
export class Table6Service {
    constructor(
        @InjectRepository(Table6Repository)
        private table6Repository: Table6Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableIrmaDto: CreateTableIrmaDto): Promise<Table6> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_8a, upper_8a, cannot_grade } = createTableIrmaDto
            let value: number

            if(lower_8a) {
                value = 0
            } else if(upper_8a) {
                value = 1
            } else if(cannot_grade) {
                value = 2
            } else {
                value = 3
            }

            const table = this.table6Repository.create({ value, eye_photo: photo })
            return await this.table6Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table6> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table6Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableIrmaDto: UpdateTableIrmaDto): Promise<Table6> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table6Repository.findOne({ where: { eye_photo } })
            const { lower_8a, upper_8a, cannot_grade } = updateTableIrmaDto

            if(lower_8a) {
                table.value = 0
            } else if(upper_8a) {
                table.value = 1
            } else if(cannot_grade) {
                table.value = 2
            } else {
                throw new BadRequestException()
            }

            return await this.table6Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table6Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table6Repository.delete(table.table_6_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
