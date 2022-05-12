import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from '../controllers/subjects.controller';
import { MongoDataServicesModule } from "../infrastructure/mongodb/mongo-data-services.module";
import { SubjectFactoryService } from "./subject-factory.service";

@Module({
  imports: [MongoDataServicesModule],
  controllers: [SubjectsController],
  providers: [SubjectFactoryService, SubjectsService],
  exports: [SubjectFactoryService, SubjectsService],
})
export class SubjectsModule {}
