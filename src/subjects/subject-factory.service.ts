import { Injectable } from '@nestjs/common';
import { CreateSubjectDto, UpdateSubjectDto } from '../core';
@Injectable()
export class SubjectFactoryService {
  createNewSubject(createSubjectDto: CreateSubjectDto) {
    const newSubject = {
      firstName: createSubjectDto.firstName,
      lastName: createSubjectDto.lastName,
      email: createSubjectDto.email,
      phone: createSubjectDto.phone,
      address: createSubjectDto.address,
      healthConditions: createSubjectDto.healthConditions,
    };

    return newSubject;
  }

  updateSubject(updateSubjectDto: UpdateSubjectDto) {
    const newSubject = {
      firstName: updateSubjectDto.firstName,
      lastName: updateSubjectDto.lastName,
      email: updateSubjectDto.email,
      phone: updateSubjectDto.phone,
      address: updateSubjectDto.address,
      healthConditions: updateSubjectDto.healthConditions,
    };

    return newSubject;
  }
}
