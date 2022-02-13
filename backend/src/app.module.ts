import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EyePhotosModule } from './eye-photos/eye-photos.module';
import { CommentsModule } from './comments/comments.module';
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

@Module({
  imports: [

    // Config
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    }),

    // Module
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
    Table13Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
