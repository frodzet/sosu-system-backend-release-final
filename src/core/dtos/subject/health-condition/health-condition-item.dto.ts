import { PartialType } from '@nestjs/mapped-types';

export class CreateHealthConditionItemDto {
  subTitle: string;
  description: string;
  reason: string;
  relevant: number;
}

export class UpdateHealthConditionItemDto extends PartialType(
  CreateHealthConditionItemDto,
) {}
