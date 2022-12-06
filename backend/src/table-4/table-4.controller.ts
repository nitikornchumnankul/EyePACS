import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableHmaDto } from 'src/table-dto/create-table-hma.dto';
import { UpdateTableHmaDto } from 'src/table-dto/update-table-hma.dto';
import { Table4 } from './table-4.entity';
import { Table4Service } from './table-4.service';

@Controller('table-4')
export class Table4Controller {
    constructor(private table4Service: Table4Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createTableHmaDto: CreateTableHmaDto,
    ): Promise<Table4> {
        return this.table4Service.createTable(eye_photo_id, createTableHmaDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTableHmaDto: UpdateTableHmaDto,
    ): Promise<Table4> {
        return this.table4Service.updateTable(eye_photo_id, updateTableHmaDto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table4> {
        return this.table4Service.getTable(eye_photo_id)
    }
}
