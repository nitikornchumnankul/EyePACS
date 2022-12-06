import { Module } from '@nestjs/common';
import { EyePhotosService } from './eye-photos.service';
import { EyePhotosController } from './eye-photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePhotosRepository } from './eye-photos.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EyePhotosRepository,
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          fileFilter: (req, file, cb) => {
            if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif" || file.mimetype === "image/tiff") {
              cb(null, true);
            } else {
              cb(null, false);
            }
          },
          storage: diskStorage({
            destination: configService.get('PHOTOS_PATH'),
            filename: (req, file, cb) => {
              const filename: string = path.parse(file.originalname).name
              const extension: string = path.parse(file.originalname).ext

              cb(null, `${filename}${extension}`)
            }
          })
        }
      }
    })
  ],
  providers: [EyePhotosService],
  controllers: [EyePhotosController],
  exports: [EyePhotosService],
})
export class EyePhotosModule {}

