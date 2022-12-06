import { Module } from '@nestjs/common';
import { Table6Service } from './table-6.service';
import { Table6Controller } from './table-6.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table6Repository } from './table-6.repository';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table6Repository,
    ]),
  ],
  providers: [Table6Service],
  controllers: [Table6Controller],
  exports: [Table6Service]
})
export class Table6Module {}
