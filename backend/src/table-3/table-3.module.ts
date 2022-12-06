import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table3Controller } from './table-3.controller';
import { Table3Repository } from './table-3.repository';
import { Table3Service } from './table-3.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table3Repository,
    ]),
  ],
  controllers: [Table3Controller],
  providers: [Table3Service],
  exports: [Table3Service]
})
export class Table3Module {}
