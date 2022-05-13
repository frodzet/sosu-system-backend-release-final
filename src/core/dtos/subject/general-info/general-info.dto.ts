import { PartialType } from '@nestjs/mapped-types';

export class CreateGeneralInfoDto {
  title: string;

  description: string;

  comment: string;
}

export class UpdateGeneralInfoDto extends PartialType(CreateGeneralInfoDto) {}
