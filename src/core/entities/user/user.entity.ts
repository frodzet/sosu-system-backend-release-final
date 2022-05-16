import mongoose from 'mongoose';

export class User {
  userName: string;
  password: string;
  subjects: mongoose.Schema.Types.ObjectId[];
}
