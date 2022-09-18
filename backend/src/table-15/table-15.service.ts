import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { Table15Dto } from './dto/create-table-15.dto';
import { UpdateTable15Dto } from './dto/update-table-15.dto';
import { Table15 } from './entities/table-15.entity';
import { Table15Repository } from './table15.repository';

@Injectable()
export class Table15Service {
  constructor(
    @InjectRepository(Table15Repository)
    private table15Repository: Table15Repository,
    private eyePhotosService: EyePhotosService,
  ) { }


  async createTable(eye_photo_id: string, table15Dto: Table15Dto): Promise<Table15> {
    try {
      const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
      const {
        value
      } = table15Dto

      const table = this.table15Repository.create({ value, eye_photo: photo })
      return await this.table15Repository.save(table)
    } catch (e) {
      throw new BadRequestException({
        message: 'Error, Can\'t create table.'
      })
    }
  }

  async getTable(eye_photo_id: string): Promise<Table15> {
    try {
        const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
        return await this.table15Repository.findOne({ where: { eye_photo } })
    } catch(e) {
        throw new NotFoundException()
    }
}

async updateTable(eye_photo_id: string, updateTable15Dto: UpdateTable15Dto): Promise<Table15> {
  try {
      const table = await this.getTable(eye_photo_id)
      const {
          value
      } = updateTable15Dto

      if(value) {
          table.value = value
      }
      
      return await this.table15Repository.save(table)
  } catch(e) {
      throw new BadRequestException({
          message: 'Error, Table can\'t update.'
      })
  }
}

async deleteTable(eye_photo_id: string): Promise<string> {
  try {
      const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
      const table = await this.table15Repository.findOne({ where: { eye_photo } })
      if(!table) {
          return "success"
      }
      await this.table15Repository.delete(table.table_15_id)
      return "success"
  } catch(e) {
      throw new BadRequestException({
          message: 'Error, Table can\'t delete.'
      })
  }
}





}
