import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(loginDTO: LoginDto): Promise<any> {
    const user = await this.authenticationService.validateUser(loginDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
