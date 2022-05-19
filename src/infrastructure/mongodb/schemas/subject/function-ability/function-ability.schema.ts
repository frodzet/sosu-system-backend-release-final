import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { FunctionAbilityItem } from './function-ability-item.schema';
import { SubjectSchema } from '../subject.schema';
export type FunctionAbilityDocument = FunctionAbility & Document;

@Schema()
export class FunctionAbility {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ immutable: true })
  title: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FunctionAbilityItem.name,
      autopopulate: true,
    },
  ])
  @Type(() => FunctionAbilityItem)
  functionAbilityItems: FunctionAbilityItem[];
}

export const FunctionAbilitySchema =
  SchemaFactory.createForClass(FunctionAbility);
FunctionAbilitySchema.plugin(require('mongoose-autopopulate'));
