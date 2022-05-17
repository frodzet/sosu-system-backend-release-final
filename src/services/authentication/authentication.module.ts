import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../infrastructure/mongodb/mongo-data-services.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UsersService from '../use-cases/users/users.service';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongoDataServicesModule,
    PassportModule.register({ session: false }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy,
    LocalStrategy,
    UsersService,
    RolesGuard,
  ],
})
export class AuthenticationModule {}
