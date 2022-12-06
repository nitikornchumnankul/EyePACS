import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table13Controller } from './table-13.controller';
import { Table13Repository } from './table-13.repository';
import { Table13Service } from './table-13.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table13Repository,
    ]),
  ],
  controllers: [Table13Controller],
  providers: [Table13Service],
  exports: [Table13Service]
})
export class Table13Module {}
