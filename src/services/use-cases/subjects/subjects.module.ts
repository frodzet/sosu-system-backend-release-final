import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from '../../../controllers/subjects.controller';
import { MongoDataServicesModule } from '../../../infrastructure/mongodb/mongo-data-services.module';
import { TitlesGenerator } from './utils/item-titles-generator';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from '../../authentication/local-auth.guard';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../authentication/jwt-constants';

@Module({
  imports: [MongoDataServicesModule, AuthenticationModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, TitlesGenerator],
  exports: [SubjectsService],
})
export class SubjectsModule {}
