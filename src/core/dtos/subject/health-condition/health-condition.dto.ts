import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthConditionItemDto } from './health-condition-item.dto';

export class CreateHealthConditionDto {
  title: string;
  healthConditionItems: CreateHealthConditionItemDto[] = [];
}

export class UpdateHealthConditionDto extends PartialType(
  CreateHealthConditionDto,
) {}
