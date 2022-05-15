import { PartialType } from '@nestjs/mapped-types';

export class CreateNoteDto {
  timeStamp: Date;

  note: string;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
