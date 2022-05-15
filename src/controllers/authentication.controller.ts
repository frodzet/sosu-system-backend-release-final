import { Controller, Get, Body, Post } from '@nestjs/common';
import { LoginDto, RegistrationDto } from '../core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/register')
  async create(@Body() registerDTO: RegistrationDto) {
    return this.authenticationService.create(registerDTO).then((newUser) => {
      return newUser;
    });
  }
  /*
  @Post()
  async loginAndUser(@Body() loginDTO: LoginDto): Promise<UserAndTokenDTO> {
    const user = await this.loginService.validateUser(loginDTO);
    const uatdto = new UserAndTokenDTO();
    uatdto.loginUser = user;
    uatdto.token = 'temp';
    return uatdto;
  }
    @Post('/loginAndUser')
    loginAndUser(@Body() loginDTO: LoginDto) {
      return this.loginService.validateUser(loginDTO);
    }
    */

  @Post('/login')
  async login(@Body() loginDTO: LoginDto) {
    return this.authenticationService.validateUser(loginDTO);
  }
}
