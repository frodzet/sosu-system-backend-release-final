import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';

export class CreateUserDto {
  loginUser: LoginDto;
  token: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
