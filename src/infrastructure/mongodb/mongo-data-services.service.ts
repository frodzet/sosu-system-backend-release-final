import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
  Subject,
  SubjectDocument,
  Address,
  AddressDocument,
  HealthCondition,
  HealthConditionDocument,
  HealthConditionItem,
  HealthConditionItemDocument,
  GeneralInfoDocument,
  FunctionAbilityDocument,
  FunctionAbilityItem,
  GeneralInfo,
  FunctionAbility,
  Note,
} from './schemas';

@Injectable()
export class MongoDataServices implements OnApplicationBootstrap {
  _userDocumentModel: Model<UserDocument>;
  _subjectDocumentModel: Model<SubjectDocument>;
  _addressDocumentModel: Model<AddressDocument>;
  _generalInfoDocumentModel: Model<GeneralInfoDocument>;
  _healthConditionDocumentModel: Model<HealthConditionDocument>;
  _healthConditionItemDocumentModel: Model<HealthConditionItemDocument>;
  _functionAbilityDocumentModel: Model<FunctionAbilityDocument>;
  _functionAbilityItemDocumentModel: Model<FunctionAbilityItem>;
  // _noteDocumentModel: Model<Note>;

  constructor(
    @InjectModel(User.name)
    private userDocumentModel: Model<UserDocument>,
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
    @InjectModel(FunctionAbility.name)
    private functionAbilityDocumentModel: Model<FunctionAbilityDocument>,
    @InjectModel(FunctionAbilityItem.name)
    private functionAbilityItemDocumentModel: Model<FunctionAbilityItem>, // @InjectModel(Note.name) // private noteDocumentModel: Model<Note>,
  ) {
    // this.subjectDocumentModel.db.db
    //   .dropDatabase()
    //   .then((r) => console.log('database dropped'));
    // DB-Collection Size Test
  }

  onApplicationBootstrap() {
    this._userDocumentModel = this.userDocumentModel;
    this._subjectDocumentModel = this.subjectDocumentModel;
    this._addressDocumentModel = this.addressDocumentModel;
    this._generalInfoDocumentModel = this.generalInfoDocumentModel;
    this._healthConditionDocumentModel = this.healthConditionDocumentModel;
    this._healthConditionItemDocumentModel =
      this.healthConditionItemDocumentModel;
    this._functionAbilityDocumentModel = this.functionAbilityDocumentModel;
    this._functionAbilityItemDocumentModel =
      this.functionAbilityItemDocumentModel;
    // this._noteDocumentModel = this.noteDocumentModel;
  }
}
