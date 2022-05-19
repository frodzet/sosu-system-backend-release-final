import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { HealthCondition } from './health-condition/health-condition.schema';
import { GeneralInfo } from './general-info/general-info.schema';
import { FunctionAbility } from './function-ability/function-ability.schema';
import { Note } from './note.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: AddressSchema, required: true })
  @Type(() => Address)
  address: Address;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: GeneralInfo.name,
      autopopulate: true,
    },
  ])
  @Type(() => GeneralInfo)
  generalInformation: GeneralInfo[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: HealthCondition.name,
      autopopulate: true,
    },
  ])
  @Type(() => HealthCondition)
  healthConditions: HealthCondition[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FunctionAbility.name,
      autopopulate: true,
    },
  ])
  @Type(() => FunctionAbility)
  functionAbilities: FunctionAbility[];

  // @Prop([
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: Note.name,
  //     autopopulate: true,
  //   },
  // ])
  // @Type(() => Note)
  // notes: Note[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
SubjectSchema.plugin(require('mongoose-autopopulate'));
