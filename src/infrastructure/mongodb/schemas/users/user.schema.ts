import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  userName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
