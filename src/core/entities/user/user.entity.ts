import mongoose from 'mongoose';
import { Role } from '../../../services/authentication/roles/role.enum';

export class User {
  userName: string;
  password: string;
  subjects: mongoose.Schema.Types.ObjectId[];
}
