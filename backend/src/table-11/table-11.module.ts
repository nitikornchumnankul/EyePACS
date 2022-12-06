import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table11Controller } from './table-11.controller';
import { Table11Repository } from './table-11.repository';
import { Table11Service } from './table-11.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table11Repository,
    ])
  ],
  controllers: [Table11Controller],
  providers: [Table11Service],
  exports: [Table11Service]
})
export class Table11Module {}
