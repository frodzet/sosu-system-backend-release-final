import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { HealthConditionItem } from './health-condition-item.schema';
import { SubjectSchema } from '../subject.schema';

export type HealthConditionDocument = HealthCondition & Document;

@Schema()
export class HealthCondition {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ immutable: true })
  @Transform(({ value }) => value.toLowerCase())
  title: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: HealthConditionItem.name,
      autopopulate: true,
    },
  ])
  @Type(() => HealthConditionItem)
  healthConditionItems: HealthConditionItem[];
}

export const HealthConditionSchema =
  SchemaFactory.createForClass(HealthCondition);
HealthConditionSchema.plugin(require('mongoose-autopopulate'));
