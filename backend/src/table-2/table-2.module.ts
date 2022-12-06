import { Module } from '@nestjs/common';
import { Table2Service } from './table-2.service';
import { Table2Controller } from './table-2.controller';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table2Repository } from './table-2.repository';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table2Repository,
    ]),
  ],
  providers: [Table2Service],
  controllers: [Table2Controller],
  exports: [Table2Service]
})
export class Table2Module {}
