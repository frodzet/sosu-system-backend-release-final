import { Injectable } from '@nestjs/common';
import {
  Address,
  CreateSubjectDto,
  HealthCondition,
  HealthConditionItem,
  Subject,
  UpdateAddressDto,
  UpdateHealthConditionItemDto,
} from '../core';
import { MongoDataServices } from '../infrastructure/mongodb/mongo-data-services.service';
import { SubjectFactoryService } from './subject-factory.service';
import { SubTitles, Titles, TitlesGenerator } from './item-titles-generator';

const mongoose = require('mongoose');

@Injectable()
export class SubjectsService {
  constructor(
    private dataServices: MongoDataServices,
    private factoryService: SubjectFactoryService,
    private titlesGenerator: TitlesGenerator,
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
      healthConditions: await this.createHealthCondition(),
      // healthConditions:
      //   await this.dataServices._healthConditionDocumentModel.create([
      //     {
      //       _id: mongoose.Types.ObjectId(),
      //       title: Titles.FUNCTION_LEVEL,
      //       healthConditionItems:
      //         await this.dataServices._healthConditionItemDocumentModel.create([
      //           {
      //             _id: mongoose.Types.ObjectId(),
      //             subTitle: SubTitles.PROBLEMS_WITH_PERSONAL_CARE,
      //             description: '',
      //             reason: '',
      //             relevant: null,
      //           },
      //           {
      //             _id: mongoose.Types.ObjectId(),
      //             subTitle: SubTitles.PROBLEMS_WITH_DAILY_ACTIVITIES,
      //             description: '',
      //             reason: '',
      //             relevant: null,
      //           },
      //         ]),
      //     },
      //     {
      //       _id: mongoose.Types.ObjectId(),
      //       title: Titles.MUSCULOSKELETAL_SYSTEM,
      //       healthConditionItems:
      //         await this.dataServices._healthConditionItemDocumentModel.create([
      //           {
      //             _id: mongoose.Types.ObjectId(),
      //             subTitle: 'Problemer med mobilitet og bevægelse',
      //             description: '',
      //             reason: '',
      //             relevant: null,
      //           },
      //         ]),
      //     },
      //     {
      //       _id: mongoose.Types.ObjectId(),
      //       title: Titles.NUTRITION,
      //       healthConditionItems:
      //         await this.dataServices._healthConditionItemDocumentModel.create([
      //           {
      //             _id: mongoose.Types.ObjectId(),
      //             subTitle: 'Problemer med væskeindtag',
      //             description: '',
      //             reason: '',
      //             relevant: null,
      //           },
      //           {
      //             _id: mongoose.Types.ObjectId(),
      //             subTitle: 'Problemer med fødeindtag',
      //             description: '',
      //             reason: '',
      //             relevant: null,
      //           },
      //         ]),
      //     },
      //   ]),
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
      .populate('healthConditions');

    return allSubjects;
  }

  async findOne(id: string): Promise<Subject> {
    return this.dataServices._subjectDocumentModel
      .findOne({ _id: id })
      .populate('address')
      .populate({
        path: 'healthConditions',
        populate: { path: 'healthConditionItems' },
      });
  }

  /** Generates all basic health-conditions */
  async createHealthCondition(): Promise<HealthCondition[]> {
    const allTitles = this.titlesGenerator.getTitles();
    const allHealthConditions: HealthCondition[] = [];
    const allItems: HealthConditionItem[] = [];

    for (const [key, values] of allTitles) {
      for (const v of values) {
        const item =
          await this.dataServices._healthConditionItemDocumentModel.create({
            _id: mongoose.Types.ObjectId(),
            subTitle: v,
            description: '',
            reason: '',
            relevant: null,
          });
        allItems.push(item);
      }
      const healthCondition =
        await this.dataServices._healthConditionDocumentModel.create({
          _id: mongoose.Types.ObjectId(),
          title: key,
          healthConditionItems: allItems,
        });
      allHealthConditions.push(healthCondition);
    }

    return allHealthConditions;
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

  async updateItem(
    subjectId: string,
    itemId: string,
    updateItemDto: UpdateHealthConditionItemDto,
  ): Promise<HealthConditionItem> {
    return this.dataServices._healthConditionItemDocumentModel.findOneAndUpdate(
      { _id: itemId },
      updateItemDto,
      { new: true },
    );
  }
}
