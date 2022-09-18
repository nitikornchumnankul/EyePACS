import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EyePhotosModule } from './eye-photos/eye-photos.module';
import { CommentsModule } from './comments/comments.module';

// Module
import { Table1Module } from './table-1/table-1.module';
import { Table2Module } from './table-2/table-2.module';
import { Table3Module } from './table-3/table-3.module';
import { Table4Module } from './table-4/table-4.module';
import { Table5Module } from './table-5/table-5.module';
import { Table6Module } from './table-6/table-6.module';
import { Table7Module } from './table-7/table-7.module';
import { Table8Module } from './table-8/table-8.module';
import { Table9Module } from './table-9/table-9.module';
import { Table10Module } from './table-10/table-10.module';
import { Table11Module } from './table-11/table-11.module';
import { Table12Module } from './table-12/table-12.module';
import { Table13Module } from './table-13/table-13.module';

// Repository
import { Table1Repository } from './table-1/table-1.repository';
import { EyePhotosRepository } from './eye-photos/eye-photos.repository';
import { Table2Repository } from './table-2/table-2.repository';
import { Table3Repository } from './table-3/table-3.repository';
import { Table4Repository } from './table-4/table-4.repository';
import { Table5Repository } from './table-5/table-5.repository';
import { Table6Repository } from './table-6/table-6.repository';
import { Table7Repository } from './table-7/table-7.repository';
import { Table8Repository } from './table-8/table-8.repository';
import { Table9Repository } from './table-9/table-9.repository';
import { Table10Repository } from './table-10/table-10.repository';
import { Table11Repository } from './table-11/table-11.repository';
import { Table12Repository } from './table-12/table-12.repository';
import { Table13Repository } from './table-13/table-13.repository';
import { Table14Module } from './table-14/table-14.module';
import { Table14Repository } from './table-14/table14.repository';
import { CommentsRepository } from './comments/comments.repository';
import { config } from 'process';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Table15Module } from './table-15/table-15.module';
import path from 'path';
import { Table15Repository } from './table-15/table15.repository';

@Module({
  imports: [

    // Repository
    TypeOrmModule.forFeature([
      EyePhotosRepository,
      Table1Repository,
      Table2Repository,
      Table3Repository,
      Table4Repository,
      Table5Repository,
      Table6Repository,
      Table7Repository,
      Table8Repository,
      Table9Repository,
      Table10Repository,
      Table11Repository,
      Table12Repository,
      Table13Repository,
      Table14Repository,
      Table15Repository,
      CommentsRepository,
    ]),

    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),

    // Database connection
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     }
    //   }
    // }),
    //Default image
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
            destination: configService.get('PHOTOS_PATH_DEFAULT'),
            filename: (req, file, cb) => {
              const filename: string = path.parse(file.originalname).name
              const extension: string = path.parse(file.originalname).ext

              cb(null, `${filename}${extension}`)
            }
          })
        }
      }
    }),

    // For Docker
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      url: process.env.DATABASE_URL, // From env of Docker
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
   
    // Module
    ConfigModule,
    AuthModule,
    UsersModule,
    EyePhotosModule,
    CommentsModule,
    Table1Module,
    Table2Module,
    Table3Module,
    Table4Module,
    Table5Module,
    Table6Module,
    Table7Module,
    Table8Module,
    Table9Module,
    Table10Module,
    Table11Module,
    Table12Module,
    Table13Module,
    Table14Module,
    Table15Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
