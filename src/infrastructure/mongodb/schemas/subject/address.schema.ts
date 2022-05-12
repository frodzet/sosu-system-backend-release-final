import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  postCode: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
