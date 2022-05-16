import { Injectable } from '@nestjs/common';
import { MongoDataServices } from '../../infrastructure/mongodb/mongo-data-services.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegistrationDto, User } from '../../core';
import * as bcrypt from 'bcrypt';
import { ROLES_KEY } from './roles/roles.decorator';

@Injectable()
export class AuthenticationService {
  constructor(
    private dataServices: MongoDataServices,
    private jwtService: JwtService,
  ) {}

  //this method registers a user
  async create(createUserDto: RegistrationDto) {
    this.dataServices._userDocumentModel.find().then((allUsers) => {
      allUsers.forEach(function (user) {
        if (user.userName == createUserDto.userName) {
          throw new Error('userName already in use');
        }
      });
    });
    const generatedSalt = await bcrypt.genSalt();
    this.hashPassword(createUserDto.password, generatedSalt).then(
      (hashedPassword) => {
        const newUser = new this.dataServices._userDocumentModel({
          userName: createUserDto.userName,
          password: hashedPassword,
          role: ROLES_KEY,
        });
        newUser.save();
      },
    );
  }

  //this method hashes a password using a salt, it is used when creating an account and logging in
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  //this compares 2 passwords, and returns a user if the password was correct.
  async validateUser(loginDTO: LoginDto) {
    const userFromDb = await this.getUser(loginDTO);
    const rightPassword = await bcrypt.compare(
      loginDTO.password,
      userFromDb.password,
    );
    if (userFromDb && rightPassword == true) {
      const payload = { userName: loginDTO.userName };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('The entered password was wrong password');
    }
  }

  async getUser(loginDTO: LoginDto): Promise<User> {
    return await this.dataServices._userDocumentModel
      .findOne({
        userName: loginDTO.userName,
      })
      .exec();
  }
}
