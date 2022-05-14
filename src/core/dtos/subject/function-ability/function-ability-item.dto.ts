import { PartialType } from '@nestjs/mapped-types';

export class CreateFunctionAbilityItemDto {
  subTitle: string;

  currentLevel: number;

  expectedLevel: number;

  note: string;

  execution: string;

  meaningOfExecution: string;

  subjectWish: string;
}

export class UpdateFunctionAbilityItemDto extends PartialType(
  CreateFunctionAbilityItemDto,
) {}
