import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type FunctionAbilityItemDocument = FunctionAbilityItem & Document;

@Schema()
export class FunctionAbilityItem {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ immutable: true })
  subTitle: string;

  @Prop({ min: 0, max: 4 })
  currentLevel: number;

  @Prop({ min: 0, max: 4 })
  expectedLevel: number;

  @Prop()
  note: string;

  @Prop()
  execution: string;

  @Prop()
  meaningOfExecution: string;

  @Prop()
  subjectWish: string;
}

export const FunctionAbilityItemSchema =
  SchemaFactory.createForClass(FunctionAbilityItem);
