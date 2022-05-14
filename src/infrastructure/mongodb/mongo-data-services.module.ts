import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration } from './configuration';
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
} from './schemas/subject';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Address.name, schema: AddressSchema },
      { name: GeneralInfo.name, schema: GeneralInfoSchema },
      { name: HealthCondition.name, schema: HealthConditionSchema },
      { name: HealthConditionItem.name, schema: HealthConditionItemSchema },
      { name: FunctionAbility.name, schema: FunctionAbilitySchema },
      { name: FunctionAbilityItem.name, schema: FunctionAbilityItemSchema },
    ]),
    MongooseModule.forRoot(Configuration.urlKEY),
  ],
  providers: [MongoDataServices],
  exports: [MongoDataServices],
})
export class MongoDataServicesModule {}
