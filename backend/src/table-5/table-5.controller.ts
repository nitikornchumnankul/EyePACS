import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table5 } from './table-5.entity';
import { Table5Service } from './table-5.service';

@Controller('table-5')
export class Table5Controller {
    constructor(private table5Service: Table5Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableDto: CreateTableDto,
    ): Promise<Table5> {
        return this.table5Service.createTable(eye_photo_id, createTableDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableDto: UpdateTableDto,
    ): Promise<Table5> {
        return this.table5Service.updateTable(eye_photo_id, updateTableDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table5> {
        return this.table5Service.getTable(eye_photo_id)
    }
}
