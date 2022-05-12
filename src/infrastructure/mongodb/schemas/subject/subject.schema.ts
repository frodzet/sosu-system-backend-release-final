import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { HealthCondition } from './health-condition/health-condition.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: HealthCondition.name }])
  @Type(() => HealthCondition)
  healthConditions: HealthCondition[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
