import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table7 } from './table-7.entity';
import { Table7Service } from './table-7.service';

@Controller('table-7')
export class Table7Controller {
    constructor(private table7Service: Table7Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableDto: CreateTableDto,
    ): Promise<Table7> {
        return this.table7Service.createTable(eye_photo_id, createTableDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableDto: UpdateTableDto,
    ): Promise<Table7> {
        return this.table7Service.updateTable(eye_photo_id, updateTableDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table7> {
        return this.table7Service.getTable(eye_photo_id)
    }
}
