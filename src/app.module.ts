import { Module } from '@nestjs/common';
import { SubjectsModule } from './services/use-cases/subjects/subjects.module';
import { MongoDataServicesModule } from './infrastructure/mongodb/mongo-data-services.module';

@Module({
  imports: [MongoDataServicesModule, SubjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
