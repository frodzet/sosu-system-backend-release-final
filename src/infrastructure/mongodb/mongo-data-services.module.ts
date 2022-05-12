import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration } from './configuration';
import {
  Subject,
  SubjectSchema,
  Address,
  AddressSchema,
  HealthCondition,
  HealthConditionSchema,
  HealthConditionItem,
  HealthConditionItemSchema,
} from './schemas/subject';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Address.name, schema: AddressSchema },
      { name: HealthCondition.name, schema: HealthConditionSchema },
      { name: HealthConditionItem.name, schema: HealthConditionItemSchema },
    ]),
    MongooseModule.forRoot(Configuration.urlKEY),
  ],
  providers: [MongoDataServices],
  exports: [MongoDataServices],
})
export class MongoDataServicesModule {}
