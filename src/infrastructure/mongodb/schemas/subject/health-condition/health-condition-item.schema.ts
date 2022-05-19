import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type HealthConditionItemDocument = HealthConditionItem & Document;

@Schema()
export class HealthConditionItem {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ immutable: true })
  @Transform(({ value }) => value.toLowerCase())
  subTitle: string;

  @Prop()
  comment: string;

  @Prop()
  reason: string;

  @Prop({ min: 0, max: 2 })
  relevant: number;
}

export const HealthConditionItemSchema =
  SchemaFactory.createForClass(HealthConditionItem);
