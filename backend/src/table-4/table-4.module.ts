import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { Table4Controller } from './table-4.controller';
import { Table4Repository } from './table-4.repository';
import { Table4Service } from './table-4.service';

@Module({
  imports: [
    EyePhotosModule,
    TypeOrmModule.forFeature([
      Table4Repository,
    ]),
  ],
  controllers: [Table4Controller],
  providers: [Table4Service],
  exports: [Table4Service]
})
export class Table4Module {}
