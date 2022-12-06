import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table3 } from './table-3.entity';
import { Table3Service } from './table-3.service';

@Controller('table-3')
export class Table3Controller {
    constructor(private table3Service: Table3Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableDto: CreateTableDto,
    ): Promise<Table3> {
        return this.table3Service.createTable(eye_photo_id, createTableDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableDto: UpdateTableDto,
    ): Promise<Table3> {
        return this.table3Service.updateTable(eye_photo_id, updateTableDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table3> {
        return this.table3Service.getTable(eye_photo_id)
    }
}
