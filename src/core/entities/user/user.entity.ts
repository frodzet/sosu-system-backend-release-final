import { Subject } from '../subject/subject.entity';
import mongoose from 'mongoose';
import { IsString } from 'class-validator';
import { Role } from '../../../services/authentication/roles/roles.enum';

export class User {
  userName: string;
  password: string;
  roles: Role[];
  subjects: mongoose.Schema.Types.ObjectId[];
}
