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

@Injectable()
export class MongoDataServices implements OnApplicationBootstrap {
  _subjectDocumentModel: Model<SubjectDocument>;
  _addressDocumentModel: Model<AddressDocument>;
  _healthConditionDocumentModel: Model<HealthConditionDocument>;
  _healthConditionItemDocumentModel: Model<HealthConditionItemDocument>;

  constructor(
    @InjectModel(Subject.name)
    private subjectDocumentModel: Model<SubjectDocument>,
    @InjectModel(Address.name)
    private addressDocumentModel: Model<AddressDocument>,
    @InjectModel(HealthCondition.name)
    private healthConditionDocumentModel: Model<HealthConditionDocument>,
    @InjectModel(HealthConditionItem.name)
    private healthConditionItemDocumentModel: Model<HealthConditionItemDocument>,
  ) {}

  onApplicationBootstrap() {
    this._subjectDocumentModel = this.subjectDocumentModel;
    this._addressDocumentModel = this.addressDocumentModel;
    this._healthConditionDocumentModel = this.healthConditionDocumentModel;
    this._healthConditionItemDocumentModel =
      this.healthConditionItemDocumentModel;
  }
}
