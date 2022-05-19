import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubjectDto,
  FunctionAbility,
  FunctionAbilityItem,
  GeneralInfo,
  HealthCondition,
  HealthConditionItem,
  Subject,
  UpdateFunctionAbilityItemDto,
  UpdateGeneralInfoDto,
  UpdateHealthConditionItemDto,
  UpdateSubjectDto,
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
  }

  async findOne(subjectId: string): Promise<Subject> {
    return await this.getValidSubject(subjectId);
  }

  async update(
    subjectId: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return await this.dataServices._subjectDocumentModel
      .findOneAndUpdate({ _id: subjectId }, updateSubjectDto, { new: true })
      .catch(() => {
        throw new NotFoundException(`Subject with id: ${subjectId} not found!`);
      });
  }

  async remove(subjectId: string): Promise<Subject> {
    return await this.dataServices._subjectDocumentModel
      .findByIdAndRemove({
        _id: subjectId,
      })
      .catch(() => {
        throw new NotFoundException(`Subject with id: ${subjectId} not found!`);
      });
  }

  async findAllGeneralInformation(subjectId: string): Promise<GeneralInfo[]> {
    const generalInformation = await this.getValidSubject(subjectId).then(
      (s) => s.generalInformation,
    );

    return generalInformation;
  }

  async findOneGeneralInformation(
    subjectId: string,
    generalInfoId: string,
  ): Promise<GeneralInfo> {
    const generalInformation = await this.getValidSubject(subjectId).then(
      async () => await this.getValidGeneralInformation(generalInfoId),
    );
    return generalInformation;
  }

  async findAllHealthConditions(subjectId: string): Promise<HealthCondition[]> {
    return await this.getValidSubject(subjectId).then(
      (s) => s.healthConditions,
    );
  }

  async findOneHealthCondition(
    subjectId: string,
    healthConditionId: string,
  ): Promise<HealthCondition> {
    const healthCondition = await this.getValidSubject(subjectId).then(
      async () => await this.getValidHealthCondition(healthConditionId),
    );

    return healthCondition;
  }

  async findOneHealthConditionItem(
    subjectId: string,
    healthConditionId: string,
    healthConditionItemId: string,
  ) {
    const healthConditionItem = await this.getValidSubject(subjectId)
      .then(async () => await this.getValidHealthCondition(healthConditionId))
      .then(
        async () =>
          await this.getValidHealthConditionItem(healthConditionItemId),
      );
    return healthConditionItem;
  }

  async findAllFunctionAbilities(
    subjectId: string,
  ): Promise<FunctionAbility[]> {
    return await this.getValidSubject(subjectId).then(
      (s) => s.functionAbilities,
    );
  }

  async findOneFunctionAbility(
    subjectId: string,
    functionAbilityId: string,
  ): Promise<FunctionAbility> {
    return await this.getValidSubject(subjectId).then(
      async () => await this.getValidFunctionAbility(functionAbilityId),
    );
  }

  async findOneFunctionAbilityItem(
    subjectId: string,
    functionAbilityId: string,
    functionAbilityItemId: string,
  ): Promise<FunctionAbilityItem> {
    return await this.getValidSubject(subjectId)
      .then(async () => this.getValidFunctionAbility(functionAbilityId))
      .then(async () =>
        this.getValidFunctionAbilityItem(functionAbilityItemId),
      );
  }

  async updateGeneralInformation(
    subjectId: string,
    generalInformationId: string,
    updateGeneralInfoDto: UpdateGeneralInfoDto,
  ): Promise<GeneralInfo> {
    await this.getValidSubject(subjectId);

    const generalInformation = await this.dataServices._generalInfoDocumentModel
      .findOneAndUpdate({ _id: generalInformationId }, updateGeneralInfoDto, {
        new: true,
      })
      .catch(() => {
        throw new NotFoundException(
          `General Information with id ${generalInformationId} not found!`,
        );
      });

    if (!generalInformation) {
      throw new NotFoundException(
        `General Information with id ${generalInformationId} not found!`,
      );
    }

    return generalInformation;
  }

  async updateHealthConditionItem(
    subjectId: string,
    healthConditionId: string,
    healthConditionItemId: string,
    updateHealthConditionItemDto: UpdateHealthConditionItemDto,
  ): Promise<HealthConditionItem> {
    await this.getValidSubject(subjectId).then(async () => {
      await this.getValidHealthCondition(healthConditionId);
    });

    const healthConditionItem =
      await this.dataServices._healthConditionItemDocumentModel
        .findOneAndUpdate(
          { _id: healthConditionItemId },
          updateHealthConditionItemDto,
          { new: true },
        )
        .catch(() => {
          throw new NotFoundException(
            `Health Condition Item with id ${healthConditionItemId} not found!`,
          );
        });

    if (!healthConditionItem) {
      throw new NotFoundException(
        `Health Condition Item with id ${healthConditionItemId} not found!`,
      );
    }

    return healthConditionItem;
  }

  async updateFunctionAbilityItem(
    subjectId: string,
    functionAbilityId: string,
    functionAbilityItemId: string,
    updateFunctionAbilityItemDto: UpdateFunctionAbilityItemDto,
  ): Promise<FunctionAbilityItem> {
    await this.getValidSubject(subjectId).then(
      async () => await this.getValidFunctionAbility(functionAbilityId),
    );

    const functionAbilityItem =
      await this.dataServices._functionAbilityItemDocumentModel
        .findOneAndUpdate(
          { _id: functionAbilityItemId },
          updateFunctionAbilityItemDto,
          { new: true },
        )
        .catch(() => {
          throw new NotFoundException(
            `Function Ability Item with id ${functionAbilityItemId} not found!`,
          );
        });

    if (!functionAbilityItem) {
      throw new NotFoundException(
        `Function Ability Item with id ${functionAbilityItemId} not found!`,
      );
    }

    return functionAbilityItem;
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

  private async getValidSubject(subjectId: string): Promise<Subject> {
    const subject = await this.dataServices._subjectDocumentModel
      .findOne({
        _id: subjectId,
      })
      .catch(() => {
        throw new NotFoundException(`Subject with id ${subjectId} not found!`);
      });

    if (!subject) {
      throw new NotFoundException(`Subject with id ${subjectId} not found!`);
    }

    return subject;
  }

  private async getValidGeneralInformation(generalInfoId: string) {
    const generalInfo = await this.dataServices._generalInfoDocumentModel
      .findOne({
        _id: generalInfoId,
      })
      .catch(() => {
        throw new NotFoundException(
          `General Information with id ${generalInfoId} not found!`,
        );
      });

    if (!generalInfo) {
      throw new NotFoundException(
        `General Information with id ${generalInfoId} not found!`,
      );
    }

    return generalInfo;
  }

  private async getValidHealthCondition(
    healthConditionId: string,
  ): Promise<HealthCondition> {
    const healthCondition =
      await this.dataServices._healthConditionDocumentModel
        .findOne({
          _id: healthConditionId,
        })
        .catch(() => {
          throw new NotFoundException(
            `Health Condition with id ${healthConditionId} not found!`,
          );
        });

    if (!healthCondition) {
      throw new NotFoundException(
        `Health Condition with id ${healthConditionId} not found!`,
      );
    }

    return healthCondition;
  }

  private async getValidHealthConditionItem(healthConditionItemId: string) {
    const healthConditionItem =
      await this.dataServices._healthConditionItemDocumentModel
        .findOne({ _id: healthConditionItemId })
        .catch(() => {
          throw new NotFoundException(
            `Health Condition Item with id ${healthConditionItemId} not found!`,
          );
        });

    if (!healthConditionItem) {
      throw new NotFoundException(
        `Health Condition Item with id ${healthConditionItemId} not found!`,
      );
    }

    return healthConditionItem;
  }

  private async getValidFunctionAbility(
    functionAbilityId: string,
  ): Promise<FunctionAbility> {
    const functionAbility =
      await this.dataServices._functionAbilityDocumentModel
        .findOne({
          _id: functionAbilityId,
        })
        .catch(() => {
          throw new NotFoundException(
            `Function Ability with id ${functionAbilityId} not found!`,
          );
        });

    if (!functionAbility) {
      throw new NotFoundException(
        `Function Ability with id ${functionAbilityId} not found!`,
      );
    }

    return functionAbility;
  }

  private async getValidFunctionAbilityItem(functionAbilityItemId: string) {
    const functionAbilityItem =
      await this.dataServices._functionAbilityItemDocumentModel
        .findOne({ _id: functionAbilityItemId })
        .catch(() => {
          throw new NotFoundException(
            `Function Ability Item with id ${functionAbilityItemId} not found!`,
          );
        });

    if (!functionAbilityItem) {
      throw new NotFoundException(
        `Function Ability Item with id ${functionAbilityItemId} not found!`,
      );
    }

    return functionAbilityItem;
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
