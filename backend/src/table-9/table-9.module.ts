import { Module } from '@nestjs/common';
import { Table9Service } from './table-9.service';
import { Table9Controller } from './table-9.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table9Repository } from './table-9.repository';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table9Repository,
    ])
  ],
  providers: [Table9Service],
  controllers: [Table9Controller],
  exports: [Table9Service]
})
export class Table9Module {}
