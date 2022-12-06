import { Module } from '@nestjs/common';
import { Table7Service } from './table-7.service';
import { Table7Controller } from './table-7.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table7Repository } from './table-7.repository';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table7Repository,
    ])
  ],
  providers: [Table7Service],
  controllers: [Table7Controller],
  exports: [Table7Service]
})
export class Table7Module {}
