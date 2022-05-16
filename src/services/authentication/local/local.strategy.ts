import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UserDocument } from '../../../infrastructure/mongodb/schemas';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'userName',
    });
  }
  async validate(userName: string, password: string): Promise<UserDocument> {
    return this.authenticationService.getAuthenticatedUser(userName, password);
  }
}
