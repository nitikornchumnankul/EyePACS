import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table12Controller } from './table-12.controller';
import { Table12Repository } from './table-12.repository';
import { Table12Service } from './table-12.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table12Repository,
    ]),
  ],
  controllers: [Table12Controller],
  providers: [Table12Service],
  exports: [Table12Service]
})
export class Table12Module {}
