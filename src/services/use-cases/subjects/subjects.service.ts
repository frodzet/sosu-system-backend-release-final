import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Subject,
  CreateSubjectDto,
  Address,
  UpdateAddressDto,
  GeneralInfo,
  HealthCondition,
  HealthConditionItem,
  UpdateHealthConditionItemDto,
  FunctionAbility,
  FunctionAbilityItem,
  UpdateSubjectDto,
  CreateHealthConditionDto,
} from '../../../core';
import { MongoDataServices } from '../../../infrastructure/mongodb/mongo-data-services.service';
import { TitlesGenerator } from './utils/item-titles-generator';
const mongoose = require('mongoose');

/*
 * Todo: Få opsat alle routes og lavet metoder dertil.
 *  Kig på roles guard og få det implementeret. Lige nu kan alle med en login-token
 *  lave subjects.
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
      address: createSubjectDto.address,
      generalInformation: await this.createGeneralInformation(),
      healthConditions: await this.createHealthConditions(),
      functionAbilities: await this.createFunctionAbilities(),
    });

    /* WE ADDED AUTO-POPULATE, BELOW CODE IS REDUNDANT */
    // await newSubject.populate('address'); // Consider setting up 'mongoose-autopopulate'
    // await newSubject.populate('generalInformation');
    // await newSubject.populate({
    //   path: 'healthConditions',
    //   populate: { path: 'healthConditionItems' },
    // });
    // await newSubject.populate({
    //   path: 'functionAbilities',
    //   populate: { path: 'functionAbilityItems' },
    // });
    // await newSubject.populate('address');
    // await newSubject.populate('generalInformation');

    /*
     * Used for checking database-size - we're just logging it.
     * Current condition: FINE
     */
    console.log(await this.dataServices._subjectDocumentModel.db.db.stats());
    console.log(
      await this.dataServices._subjectDocumentModel.db
        .collection('subjects')
        .stats(),
    );

    return newSubject;
  }

  async findAll(): Promise<Subject[]> {
    return this.dataServices._subjectDocumentModel.find();
    // .populate('address')
    // .populate('generalInformation')
    // .populate({
    //   path: 'healthConditions',
    //   populate: { path: 'healthConditionItems' },
    // })
    // .populate({
    //   path: 'functionAbilities',
    //   populate: { path: 'functionAbilityItems' },
    // });
  }

  async findOne(subjectId: string): Promise<Subject> {
    return this.dataServices._subjectDocumentModel.findOne({ _id: subjectId });
    // .populate('address')
    // .populate('generalInformation')
    // .populate({
    //   path: 'healthConditions',
    //   populate: { path: 'healthConditionItems' },
    // })
    // .populate({
    //   path: 'functionAbilities',
    //   populate: { path: 'functionAbilityItems' },
    // });
  }

  async update(
    subjectId: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.dataServices._subjectDocumentModel.findOneAndUpdate(
      { _id: subjectId },
      updateSubjectDto,
      { new: true },
    );
  }

  async remove(subjectId: string): Promise<Subject> {
    /* TODO: Create a function that deletes all relations from the database
     *   as well */
    return this.dataServices._subjectDocumentModel.findByIdAndRemove({
      _id: subjectId,
    });
  }

  /* Her opsætter vi alle vores metoder som vi skal bruge til at håndtere diverse borgere og deres data
   * Vi skal have sat routes op i frontend, så vi kan tilføje dem her i backend */

  async findAllHealthConditions(subjectId: string): Promise<HealthCondition[]> {
    return this.dataServices._subjectDocumentModel
      .findOne({ _id: subjectId })
      .then((s) => s.healthConditions);
  }

  async findSingleHealthCondition(
    subjectId: string,
    index: number,
  ): Promise<HealthCondition> {
    return await this.dataServices._subjectDocumentModel
      .findOne({ _id: subjectId })
      .then((subject) => subject.healthConditions[index]);
  }

  async findSingleHealthConditionItem(
    subjectId: string,
    index: number,
    itemIndex: number,
  ): Promise<HealthConditionItem> {
    return await this.dataServices._subjectDocumentModel
      .findOne({ _id: subjectId })
      .then(
        (subject) =>
          subject.healthConditions[index].healthConditionItems[itemIndex],
      );
  }

  async updateSingleHealthConditionItem(
    healthConditionItemId: string,
    updateHealthConditionItemDto: UpdateHealthConditionItemDto,
  ): Promise<HealthConditionItem> {
    return this.dataServices._healthConditionItemDocumentModel.findOneAndUpdate(
      { _id: healthConditionItemId },
      updateHealthConditionItemDto,
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
        comment: null,
      });
      // add the newly created item to a list of generalInformation
      allGeneralInformation.push(item);
    }

    return allGeneralInformation;
  }

  async createHealthConditions(): Promise<HealthCondition[]> {
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
            comment: null,
            reason: null,
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

  async createFunctionAbilities(): Promise<FunctionAbility[]> {
    const allTitles = this.titlesGenerator.generateFunctionAbilityTitles();
    const allFunctionAbilities: FunctionAbility[] = [];

    // Loop through each key/value-pair in titles/subTitles[].
    for (const [title, subTitles] of allTitles) {
      // Create a new items array on each loop to hold all items for one FunctionAbility.
      const allItems: FunctionAbilityItem[] = [];
      // Loop through each subTitle
      for (const subTitle of subTitles) {
        // Generate an item for each subTitle
        const item =
          await this.dataServices._functionAbilityItemDocumentModel.create({
            _id: mongoose.Types.ObjectId(),
            subTitle: subTitle,
            currentLevel: null,
            expectedLevel: null,
            execution: null,
            meaningOfExecution: null,
            subjectWish: null,
            note: null,
          });
        // Add each item to allItems
        allItems.push(item);
      }
      // Create a new health condition
      const functionAbility =
        await this.dataServices._functionAbilityDocumentModel.create({
          _id: mongoose.Types.ObjectId(),
          title: title,
          functionAbilityItems: allItems,
        });
      // Add the health condition to list of HealthCondition (allHealthConditions)
      allFunctionAbilities.push(functionAbility);
    }

    return allFunctionAbilities;
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
