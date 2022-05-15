import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  timeStamp: Date;

  @Prop()
  note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
