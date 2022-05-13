import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subject,
  SubjectDocument,
  Address,
  AddressDocument,
  HealthCondition,
  HealthConditionDocument,
  HealthConditionItem,
  HealthConditionItemDocument,
} from './schemas/subject';
import {
  GeneralInfo,
  GeneralInfoDocument,
} from './schemas/subject/general-info/general-info.schema';

@Injectable()
export class MongoDataServices implements OnApplicationBootstrap {
  _subjectDocumentModel: Model<SubjectDocument>;
  _addressDocumentModel: Model<AddressDocument>;
  _generalInfoDocumentModel: Model<GeneralInfoDocument>;
  _healthConditionDocumentModel: Model<HealthConditionDocument>;
  _healthConditionItemDocumentModel: Model<HealthConditionItemDocument>;

  constructor(
    @InjectModel(Subject.name)
    private subjectDocumentModel: Model<SubjectDocument>,
    @InjectModel(Address.name)
    private addressDocumentModel: Model<AddressDocument>,
    @InjectModel(GeneralInfo.name)
    private generalInfoDocumentModel: Model<GeneralInfoDocument>,
    @InjectModel(HealthCondition.name)
    private healthConditionDocumentModel: Model<HealthConditionDocument>,
    @InjectModel(HealthConditionItem.name)
    private healthConditionItemDocumentModel: Model<HealthConditionItemDocument>,
  ) {
    this.subjectDocumentModel.db.db
      .dropDatabase()
      .then((r) => console.log('database dropped'));
  }

  onApplicationBootstrap() {
    this._subjectDocumentModel = this.subjectDocumentModel;
    this._addressDocumentModel = this.addressDocumentModel;
    this._generalInfoDocumentModel = this.generalInfoDocumentModel;
    this._healthConditionDocumentModel = this.healthConditionDocumentModel;
    this._healthConditionItemDocumentModel =
      this.healthConditionItemDocumentModel;
  }
}
