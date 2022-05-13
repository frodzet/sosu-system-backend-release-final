import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './address.dto';
import { CreateHealthConditionDto } from './health-condition/health-condition.dto';
import { CreateGeneralInfoDto } from './general-info/general-info.dto';

export class CreateSubjectDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: CreateAddressDto;
  generalInformation: CreateGeneralInfoDto[];
  healthConditions: CreateHealthConditionDto[];
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
