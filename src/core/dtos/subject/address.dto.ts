import { PartialType } from '@nestjs/mapped-types';

export class CreateAddressDto {
  city: string;
  street: string;
  postCode: number;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
