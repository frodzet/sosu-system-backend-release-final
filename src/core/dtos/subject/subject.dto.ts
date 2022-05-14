import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './address.dto';
import { CreateHealthConditionDto } from './health-condition/health-condition.dto';
import { CreateGeneralInfoDto } from './general-info/general-info.dto';
import { CreateFunctionAbilityDto } from './function-ability/function-ability.dto';

export class CreateSubjectDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: CreateAddressDto;
  generalInformation: CreateGeneralInfoDto[];
  healthConditions: CreateHealthConditionDto[];
  functionAbilities: CreateFunctionAbilityDto[];
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
