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
}

export const GeneralInfoSchema = SchemaFactory.createForClass(GeneralInfo);
