import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table8 } from './table-8.entity';
import { Table8Service } from './table-8.service';

@Controller('table-8')
export class Table8Controller {
    constructor(private table8Service: Table8Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableDto: CreateTableDto,
    ): Promise<Table8> {
        return this.table8Service.createTable(eye_photo_id, createTableDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableDto: UpdateTableDto,
    ): Promise<Table8> {
        return this.table8Service.updateTable(eye_photo_id, updateTableDto)
    }
    
    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table8> {
        return this.table8Service.getTable(eye_photo_id)
    }
}
