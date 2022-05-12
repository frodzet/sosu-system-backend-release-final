import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from '../controllers/subjects.controller';
import { MongoDataServicesModule } from '../infrastructure/mongodb/mongo-data-services.module';
import { SubjectFactoryService } from './subject-factory.service';
import { TitlesGenerator } from './item-titles-generator';

@Module({
  imports: [MongoDataServicesModule],
  controllers: [SubjectsController],
  providers: [SubjectFactoryService, SubjectsService, TitlesGenerator],
  exports: [SubjectFactoryService, SubjectsService],
})
export class SubjectsModule {}
