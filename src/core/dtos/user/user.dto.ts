import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import * as mongoose from "mongoose";
import { CreateSubjectDto } from "../subject/subject.dto";

export class CreateUserDto {
  loginUser: LoginDto;
  token: string;
  subjects: mongoose.Schema.Types.ObjectId[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
