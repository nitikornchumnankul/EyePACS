import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table14Controller } from './table-14.controller';
import { Table14Service } from './table-14.service';
import { Table14Repository } from './table14.repository';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table14Repository,
    ]),
  ],
  controllers: [Table14Controller],
  providers: [Table14Service],
  exports: [Table14Service]
})
export class Table14Module {}
