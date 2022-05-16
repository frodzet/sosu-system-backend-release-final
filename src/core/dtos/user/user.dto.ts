import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import * as mongoose from 'mongoose';
import { CreateSubjectDto } from '../subject/subject.dto';

export class CreateUserDto {
  userName: string;
  password: string;
  subjects?: mongoose.Schema.Types.ObjectId[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
