import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from '../table-dto/create-table.dto';
import { UpdateTableDto } from '../table-dto/update-table.dto';
import { Table1 } from './table-1.entity';
import { Table1Service } from './table-1.service';

@Controller('table-1')
export class Table1Controller {
    constructor(private table1Service: Table1Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableDto: CreateTableDto,
    ): Promise<Table1> {
        return this.table1Service.createTable(eye_photo_id, createTableDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableDto: UpdateTableDto,
    ): Promise<Table1> {
        return this.table1Service.updateTable(eye_photo_id, updateTableDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table1> {
        return this.table1Service.getTable(eye_photo_id)
    }
}
