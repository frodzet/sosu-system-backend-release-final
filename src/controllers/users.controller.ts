import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from '../services/use-cases/users/users.service';
import { User } from '../core';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(@Body() input: string): Promise<User[]> {
    return this.usersService.getAllFromInput();
  }
}
