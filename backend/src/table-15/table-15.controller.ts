import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Table15Service } from './table-15.service';
import { Table15Dto } from './dto/create-table-15.dto';
import { UpdateTable15Dto } from './dto/update-table-15.dto';
import { Table15 } from './entities/table-15.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('table-15')
export class Table15Controller {
  constructor(private readonly table15Service: Table15Service) {}


  @UseGuards(JwtAuthGuard)
  @Post(':eye_photo_id/create')
  createTable(
      @Param('eye_photo_id') eye_photo_id: string,
      @Body() table14Dto: Table15Dto,
  ): Promise<Table15> {
      return this.table15Service.createTable(eye_photo_id, table14Dto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':eye_photo_id/update')
  updateTable(
      @Param('eye_photo_id') eye_photo_id: string,
      @Body() updateTable14Dto: UpdateTable15Dto,
  ): Promise<Table15> {
      return this.table15Service.updateTable(eye_photo_id, updateTable14Dto)
  }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table15> {
        return this.table15Service.getTable(eye_photo_id)
    }
}
