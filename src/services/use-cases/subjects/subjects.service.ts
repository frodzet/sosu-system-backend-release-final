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
import { GeneralInfo } from '../../../core/entities/subject/general-info/general-info.entity';

const mongoose = require('mongoose');
/*
 * To-Do: Setup FactoryService for DTO's.
 */
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
      // We kinda skip the DTO's for this part - we just need to make sure that we manually set a new random-ID. These
      // are just auto-filled items that should be the exact same for each new subject created. Updating arrays inside
      // arrays are tedious and time-consuming.
      generalInformation: await this.createGeneralInformation(),
      healthConditions: await this.createHealthCondition(),
    });
    await newSubject.populate('address'); // Consider setting up 'mongoose-autopopulate'
    await newSubject.populate('generalInformation');
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
      .populate('generalInformation')
      .populate({
        path: 'healthConditions',
        populate: { path: 'healthConditionItems' },
      });
  }

  async findOne(id: string): Promise<Subject> {
    return this.dataServices._subjectDocumentModel
      .findOne({ _id: id })
      .populate('address')
      .populate('generalInformation')
      .populate({
        path: 'healthConditions',
        populate: { path: 'healthConditionItems' },
      });
  }

  async remove(id: string): Promise<Subject> {
    return this.dataServices._subjectDocumentModel.findByIdAndRemove({
      _id: id,
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
  /* Generates all basic information
   * Note: We are generating equal titles and subTitles for each subject,
   * these titles and subTitles could be stored smarter!! - we do not need them
   * for each subject as they are all identical */

  async createGeneralInformation(): Promise<GeneralInfo[]> {
    const allTitles = this.titlesGenerator.generateGeneralInfoTitles();
    const allGeneralInformation: GeneralInfo[] = [];

    // Loop through each key/value-pair in titles/descriptions.
    for (const [title, description] of allTitles) {
      // Create a new on each loop.
      const item = await this.dataServices._generalInfoDocumentModel.create({
        _id: mongoose.Types.ObjectId(),
        title: title,
        description: description,
        comment: '',
      });
      // add the newly created item to a list of generalInformation
      allGeneralInformation.push(item);
    }

    return allGeneralInformation;
  }

  async createHealthCondition(): Promise<HealthCondition[]> {
    const allTitles = this.titlesGenerator.generateHealthConditionTitles();
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
