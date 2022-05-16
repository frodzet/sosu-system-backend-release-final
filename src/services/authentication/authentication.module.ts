import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../infrastructure/mongodb/mongo-data-services.module';
import { UsersController } from '../../controllers/users.controller';
import { UsersService } from '../use-cases/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { RolesGuard } from './roles/roles.guard';
require('dotenv');

@Module({
  imports: [
    MongoDataServicesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy],
})
export class AuthenticationModule {}
