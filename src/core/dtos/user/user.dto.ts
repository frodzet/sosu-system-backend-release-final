import { PartialType } from '@nestjs/mapped-types';
import * as mongoose from 'mongoose';

export class CreateUserDto {
  userName: string;
  password: string;
  subjects?: mongoose.Schema.Types.ObjectId[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
