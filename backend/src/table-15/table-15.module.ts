import { Module } from '@nestjs/common';
import { Table15Service } from './table-15.service';
import { Table15Controller } from './table-15.controller';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table15Repository } from './table15.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table15Repository,
    ]),
  ],
  controllers: [Table15Controller],
  providers: [Table15Service],
  exports:[Table15Service]
})
export class Table15Module {}
