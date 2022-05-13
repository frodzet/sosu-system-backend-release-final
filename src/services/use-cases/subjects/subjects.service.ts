import { Injectable } from '@nestjs/common';
import {
  Address,
  CreateSubjectDto,
  HealthCondition,
  HealthConditionItem,
  Subject,
  UpdateAddressDto,
  UpdateHealthConditionItemDto,
} from '../../../core';
import { MongoDataServices } from '../../../infrastructure/mongodb/mongo-data-services.service';
import { TitlesGenerator } from './utils/item-titles-generator';

const mongoose = require('mongoose');

@Injectable()
export class SubjectsService {
  constructor(
    private dataServices: MongoDataServices,
    private titlesGenerator: TitlesGenerator,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const newSubject = await this.dataServices._subjectDocumentModel.create({
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
    });
    await newSubject.populate('address');
    await newSubject.populate({
      path: 'healthConditions',
      populate: { path: 'healthConditionItems' },
    });

    return newSubject;
  }

  async findAll(): Promise<Subject[]> {
    return this.dataServices._subjectDocumentModel
      .find()
      .populate('address')
      .populate({
        path: 'healthConditions',
        populate: { path: 'healthConditionItems' },
      });
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

  /* Helper Methods */
  /** Generates all basic health-conditions */
  async createHealthCondition(): Promise<HealthCondition[]> {
    const allTitles = this.titlesGenerator.getTitles();
    const allHealthConditions: HealthCondition[] = [];

    // Loop through each key/value-pair in titles/subTitles[].
    for (const [title, subTitles] of allTitles) {
      // Create a new items array on each loop to hold all items for one HealthCondition.
      const allItems: HealthConditionItem[] = [];
      // Loop through each subTitle
      for (const subTitle of subTitles) {
        // Generate an item for each subTitle
        const item =
          await this.dataServices._healthConditionItemDocumentModel.create({
            _id: mongoose.Types.ObjectId(),
            subTitle: subTitle,
            description: '',
            reason: '',
            relevant: null,
          });
        // Add each item to allItems
        allItems.push(item);
      }
      // Create a new health condition
      const healthCondition =
        await this.dataServices._healthConditionDocumentModel.create({
          _id: mongoose.Types.ObjectId(),
          title: title,
          healthConditionItems: allItems,
        });
      // Add the health condition to list of HealthCondition (allHealthConditions)
      allHealthConditions.push(healthCondition);
    }

    return allHealthConditions;
  }

  /* JSON-Reference */
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
}