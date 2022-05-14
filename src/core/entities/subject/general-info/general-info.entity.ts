import { IsString } from 'class-validator';

export class GeneralInfo {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  comment: string;
}
