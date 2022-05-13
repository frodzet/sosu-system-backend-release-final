import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
export type GeneralInfoDocument = GeneralInfo & Document;

@Schema()
export class GeneralInfo {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ immutable: true })
  title: string;

  @Prop({ immutable: true })
  description: string;

  @Prop()
  comment: string;

  // @Prop()
  // mastering: string;
  //
  // @Prop()
  // motivation: string;
  //
  // @Prop()
  // resources: string;
  //
  // @Prop()
  // roles: string;
  //
  // @Prop()
  // habits: string;
  //
  // @Prop()
  // educationOrJob: string;
  //
  // @Prop()
  // lifeStory: string;
  //
  // @Prop()
  // healthConditionInformation: string;
  //
  // @Prop()
  // devices: string;
  //
  // @Prop()
  // homeInterior: string;
  //
  // @Prop()
  // socialCircle: string;
}

export const GeneralInfoSchema = SchemaFactory.createForClass(GeneralInfo);
