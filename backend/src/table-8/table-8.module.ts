import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table8Controller } from './table-8.controller';
import { Table8Repository } from './table-8.repository';
import { Table8Service } from './table-8.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table8Repository,
    ])
  ],
  controllers: [Table8Controller],
  providers: [Table8Service],
  exports: [Table8Service]
})
export class Table8Module {}
