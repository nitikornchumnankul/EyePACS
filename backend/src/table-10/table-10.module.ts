import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table10Controller } from './table-10.controller';
import { Table10Repository } from './table-10.repository';
import { Table10Service } from './table-10.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table10Repository,
    ]),
  ],
  controllers: [Table10Controller],
  providers: [Table10Service],
  exports: [Table10Service]
})
export class Table10Module {}
