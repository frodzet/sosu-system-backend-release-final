import { Request } from 'express';
import { UserDocument } from '../../infrastructure/mongodb/schemas';

export interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
