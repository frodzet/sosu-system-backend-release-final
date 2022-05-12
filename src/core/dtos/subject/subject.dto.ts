import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './address.dto';
import { CreateHealthConditionDto } from './health-condition/health-condition.dto';

export class CreateSubjectDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: CreateAddressDto;
  healthConditions: CreateHealthConditionDto[];
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
