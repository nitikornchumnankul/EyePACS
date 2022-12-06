import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableHeDto } from 'src/table-dto/create-table-he.dto';
import { UpdateTableHeDto } from 'src/table-dto/update-table-he.dto';
import { Table12 } from './table-12.entity';
import { Table12Service } from './table-12.service';

@Controller('table-12')
export class Table12Controller {
    constructor(private table12Service: Table12Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableHeDto: CreateTableHeDto,
    ): Promise<Table12> {
        return this.table12Service.createTable(eye_photo_id, createTableHeDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableHeDto: UpdateTableHeDto,
    ): Promise<Table12> {
        return this.table12Service.updateTable(eye_photo_id, updateTableHeDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table12> {
        return this.table12Service.getTable(eye_photo_id)
    }
}
