import { Module } from '@nestjs/common';
import { SubjectsModule } from './services/use-cases/subjects/subjects.module';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { MongoDataServicesModule } from './infrastructure/mongodb/mongo-data-services.module';

@Module({
  imports: [MongoDataServicesModule, SubjectsModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
