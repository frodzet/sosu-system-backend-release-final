import { Subject } from "../subject/subject.entity";
import mongoose from "mongoose";
import { IsString } from "class-validator";

export class User {
  userName: string;
  password: string;
  subjects: mongoose.Schema.Types.ObjectId[];
}
