import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Subject } from '../subject/subject.schema';
require('mongoose-autopopulate');

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subject.name,
      autopopulate: true,
    },
  ])
  @Type(() => Subject)
  subjects: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(require('mongoose-autopopulate'));
