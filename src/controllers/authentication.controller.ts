import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginDto, RegistrationDto } from '../core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LocalAuthGuard } from '../services/authentication/local/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/register')
  async create(@Body() registerDTO: RegistrationDto) {
    return this.authenticationService.create(registerDTO).then((newUser) => {
      return newUser;
    });
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.validateUser(loginDto);
  }
}
