import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table5Controller } from './table-5.controller';
import { Table5Repository } from './table-5.repository';
import { Table5Service } from './table-5.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table5Repository
    ]),
  ],
  controllers: [Table5Controller],
  providers: [Table5Service],
  exports: [Table5Service]
})
export class Table5Module {}
