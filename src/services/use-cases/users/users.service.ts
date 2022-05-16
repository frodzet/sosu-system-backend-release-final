import { Injectable } from '@nestjs/common';
import { MongoDataServices } from '../../../infrastructure/mongodb/mongo-data-services.service';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { UpdateUserDto, User } from '../../../core';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: MongoDataServices,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.dataServices._userDocumentModel.find();
  }

  async addSubject(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.dataServices._userDocumentModel.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );

    return user;
  }

  async findOne(userId: string): Promise<User> {
    return this.dataServices._userDocumentModel.findOne({ _id: userId });
  }
}
