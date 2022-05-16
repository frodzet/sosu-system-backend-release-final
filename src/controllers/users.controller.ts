import { Controller, Get, Body, Post, Param, Put } from "@nestjs/common";
import { UsersService } from '../services/use-cases/users/users.service';
import { UpdateUserDto, User } from "../core";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  find(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Put(':userId/addSubject')
  addSubject(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.addSubject(userId, updateUserDto);
  }
}
