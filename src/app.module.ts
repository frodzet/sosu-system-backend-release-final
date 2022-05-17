import { Module } from '@nestjs/common';
import { SubjectsModule } from './services/use-cases/subjects/subjects.module';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { MongoDataServicesModule } from './infrastructure/mongodb/mongo-data-services.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './services/authentication/roles/roles.guard';

@Module({
  imports: [MongoDataServicesModule, SubjectsModule, AuthenticationModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
