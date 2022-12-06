import { Module } from '@nestjs/common';
import { Table1Service } from './table-1.service';
import { Table1Controller } from './table-1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table1Repository } from './table-1.repository';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table1Repository,
    ]),
  ],
  providers: [Table1Service],
  controllers: [Table1Controller],
  exports: [Table1Service]
})
export class Table1Module {}
