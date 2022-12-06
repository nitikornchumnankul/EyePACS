import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableOtherDto } from 'src/table-dto/create-table-other.dto';
import { UpdateTableOtherDto } from 'src/table-dto/update-table-other.dto';
import { Table13 } from './table-13.entity';
import { Table13Service } from './table-13.service';

@Controller('table-13')
export class Table13Controller {
    constructor(private table13Service: Table13Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableOtherDto: CreateTableOtherDto,
    ): Promise<Table13> {
        return this.table13Service.createTable(eye_photo_id, createTableOtherDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableOtherDto: UpdateTableOtherDto,
    ): Promise<Table13> {
        return this.table13Service.updateTable(eye_photo_id, updateTableOtherDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table13> {
        return this.table13Service.getTable(eye_photo_id)
    }
}

