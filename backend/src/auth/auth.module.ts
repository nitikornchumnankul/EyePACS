import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.stratrgy';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1d' }
        }
      }
    }),
    UsersModule, 
    PassportModule
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
