import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../infrastructure/mongodb/mongo-data-services.module';
import { UsersController } from '../../controllers/users.controller';
import { UsersService } from '../use-cases/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt-constants';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    MongoDataServicesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, JwtModule],
  exports: [UsersService],
})
export class AuthenticationModule {}
