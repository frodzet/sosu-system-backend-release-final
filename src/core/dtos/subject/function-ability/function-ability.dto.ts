import { PartialType } from '@nestjs/mapped-types';
import { FunctionAbilityItem } from '../../../entities/subject/function-ability/function-ability-item.entity';

export class CreateFunctionAbilityDto {
  title: string;

  functionAbilityItems: FunctionAbilityItem[];
}

export class UpdateFunctionAbilityDto extends PartialType(
  CreateFunctionAbilityDto,
) {}
