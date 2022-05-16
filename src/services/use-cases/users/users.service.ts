import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoDataServices } from '../../../infrastructure/mongodb/mongo-data-services.service';
import { CreateUserDto, User } from '../../../core';

@Injectable()
class UsersService {
  constructor(private dataServices: MongoDataServices) {}

  async getByUsername(userName: string) {
    const user = await this.dataServices._userDocumentModel.findOne({
      userName,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.dataServices._userDocumentModel.findOne({
      _id: id,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    const createdUser = new this.dataServices._userDocumentModel(userData);
    return createdUser.save();
  }
}

export default UsersService;
