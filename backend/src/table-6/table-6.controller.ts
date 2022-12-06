import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableIrmaDto } from 'src/table-dto/create-table-irma.dto';
import { UpdateTableIrmaDto } from 'src/table-dto/update-table-irma.dto';
import { Table6 } from './table-6.entity';
import { Table6Service } from './table-6.service';

@Controller('table-6')
export class Table6Controller {
    constructor(private table6Service: Table6Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableIrmaDto: CreateTableIrmaDto,
    ): Promise<Table6> {
        return this.table6Service.createTable(eye_photo_id, createTableIrmaDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableIrmaDto: UpdateTableIrmaDto,
    ): Promise<Table6> {
        return this.table6Service.updateTable(eye_photo_id, updateTableIrmaDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table6> {
        return this.table6Service.getTable(eye_photo_id)
    }
}
