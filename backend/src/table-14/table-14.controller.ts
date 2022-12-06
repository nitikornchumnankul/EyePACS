import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Table14Dto } from './dto/table14.dto';
import { UpdateTable14Dto } from './dto/update-table14.dto';
import { Table14 } from './table-14.entity';
import { Table14Service } from './table-14.service';

@Controller('table-14')
export class Table14Controller {
    constructor(private table14Service: Table14Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() table14Dto: Table14Dto,
    ): Promise<Table14> {
        return this.table14Service.createTable(eye_photo_id, table14Dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTable14Dto: UpdateTable14Dto,
    ): Promise<Table14> {
        return this.table14Service.updateTable(eye_photo_id, updateTable14Dto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table14> {
        return this.table14Service.getTable(eye_photo_id)
    }
}
