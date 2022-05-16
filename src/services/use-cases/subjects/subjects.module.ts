import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from '../../../controllers/subjects.controller';
import { MongoDataServicesModule } from '../../../infrastructure/mongodb/mongo-data-services.module';
import { TitlesGenerator } from './utils/item-titles-generator';
import { AuthenticationModule } from '../../authentication/authentication.module';

@Module({
  imports: [MongoDataServicesModule, AuthenticationModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, TitlesGenerator],
  exports: [SubjectsService],
})
export class SubjectsModule {}
