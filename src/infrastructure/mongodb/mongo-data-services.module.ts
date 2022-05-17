import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subject,
  SubjectSchema,
  Address,
  AddressSchema,
  GeneralInfo,
  GeneralInfoSchema,
  HealthCondition,
  HealthConditionSchema,
  HealthConditionItem,
  HealthConditionItemSchema,
  FunctionAbility,
  FunctionAbilitySchema,
  FunctionAbilityItem,
  FunctionAbilityItemSchema,
  UserSchema,
  User,
  NoteSchema,
  Note,
} from './schemas';
import { MongoDataServices } from './mongo-data-services.service';
import { MongooseConfigService } from './mongo-config.service';
import { connection, Connection } from 'mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../services/authentication/roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: Address.name, schema: AddressSchema },
      { name: GeneralInfo.name, schema: GeneralInfoSchema },
      { name: HealthCondition.name, schema: HealthConditionSchema },
      { name: HealthConditionItem.name, schema: HealthConditionItemSchema },
      { name: FunctionAbility.name, schema: FunctionAbilitySchema },
      { name: FunctionAbilityItem.name, schema: FunctionAbilityItemSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
    // MongooseModule.forRoot(Configuration.urlKEY),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  providers: [MongoDataServices],
  exports: [MongoDataServices],
})
export class MongoDataServicesModule {}
