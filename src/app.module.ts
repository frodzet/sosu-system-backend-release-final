import { Module } from '@nestjs/common';
import { SubjectsModule } from './services/use-cases/subjects/subjects.module';
import { AuthenticationModule } from './services/authentication/authentication.module';

@Module({
  imports: [SubjectsModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
