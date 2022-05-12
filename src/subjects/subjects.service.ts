import { Injectable } from '@nestjs/common';
import {
  Address,
  CreateSubjectDto,
  Subject,
  UpdateAddressDto,
  UpdateSubjectDto,
} from '../core';
import { MongoDataServices } from '../infrastructure/mongodb/mongo-data-services.service';
import { SubjectFactoryService } from './subject-factory.service';
const mongoose = require('mongoose');

@Injectable()
export class SubjectsService {
  constructor(
    private dataServices: MongoDataServices,
    private factoryService: SubjectFactoryService,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subjectDto = this.factoryService.createNewSubject({
      firstName: createSubjectDto.firstName,
      lastName: createSubjectDto.lastName,
      email: createSubjectDto.email,
      phone: createSubjectDto.phone,
      address: {
        city: createSubjectDto.address.city,
        street: createSubjectDto.address.street,
        postCode: createSubjectDto.address.postCode,
      },
      healthConditions:
        await this.dataServices._healthConditionDocumentModel.create([
          {
            _id: mongoose.Types.ObjectId(),
            title: 'Funktionsniveau',
            healthConditionItems:
              await this.dataServices._healthConditionItemDocumentModel.create([
                {
                  _id: mongoose.Types.ObjectId(),
                  subTitle: 'Problemer med personlig pleje',
                  description: '',
                  reason: '',
                  relevant: 2,
                },
                {
                  _id: mongoose.Types.ObjectId(),
                  subTitle: 'Problemer med daglige aktiviteter',
                  description: '',
                  reason: '',
                  relevant: 2,
                },
              ]),
          },
        ]),
    });

    const newSubject = await this.dataServices._subjectDocumentModel.create(
      subjectDto,
    );
    await newSubject.populate('address');
    await newSubject.populate({
      path: 'healthConditions',
      populate: { path: 'healthConditionItems' },
    });

    return newSubject;
  }

  async findAll(): Promise<Subject[]> {
    const allSubjects = this.dataServices._subjectDocumentModel
      .find()
      .populate('address')
      .populate('healthCondition');

    return allSubjects;
  }

  async findOne(id: string): Promise<Subject> {
    return this.dataServices._subjectDocumentModel
      .findOne({ _id: id })
      .populate('address')
      .populate('healthCondition');
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} subject`;
  // }
  //
  // async update(
  //   id: string,
  //   updateSubjectDto: UpdateSubjectDto,
  // ): Promise<Subject> {
  //   return this.dataServices._subjectDocumentModel.findOneAndUpdate(
  //     { _id: id },
  //     updateSubjectDto,
  //   );
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} subject`;
  // }

  async updateAddress(
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.dataServices._addressDocumentModel.findOneAndUpdate(
      {
        _id: addressId,
      },
      updateAddressDto,
      { new: true },
    );
  }
}
