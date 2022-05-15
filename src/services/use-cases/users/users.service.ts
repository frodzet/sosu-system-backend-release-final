import { Injectable } from '@nestjs/common';
import { MongoDataServices } from '../../../infrastructure/mongodb/mongo-data-services.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: MongoDataServices,
    private jwtService: JwtService,
  ) {}

  async getAllFromInput() {
    return this.dataServices._userDocumentModel.find();
  }
}
