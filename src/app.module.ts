import { Module } from '@nestjs/common';
import { SubjectsModule } from './services/use-cases/subjects/subjects.module';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from './services/authentication/local-auth.guard';

@Module({
  imports: [SubjectsModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
