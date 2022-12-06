import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableOtherDto } from 'src/table-dto/create-table-other.dto';
import { UpdateTableOtherDto } from 'src/table-dto/update-table-other.dto';
import { Table13 } from './table-13.entity';
import { Table13Repository } from './table-13.repository';

@Injectable()
export class Table13Service {
    constructor(
        @InjectRepository(Table13Repository)
        private table13Repository: Table13Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableOtherDto: CreateTableOtherDto): Promise<Table13> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const {
                value
            } = createTableOtherDto

            const table = this.table13Repository.create({ value, eye_photo: photo })
            return await this.table13Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table13> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table13Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableOtherDto: UpdateTableOtherDto): Promise<Table13> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table13Repository.findOne({ where: { eye_photo } })
            const {
                value
            } = updateTableOtherDto

            if(value) {
                table.value = value
            }

            return await this.table13Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table13Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table13Repository.delete(table.table_13_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
