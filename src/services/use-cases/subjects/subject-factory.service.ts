import { Injectable } from '@nestjs/common';
import {
  Address,
  CreateAddressDto,
  CreateSubjectDto,
  Subject,
  UpdateSubjectDto,
} from '../../../core';
const mongoose = require('mongoose');

@Injectable()
export class SubjectFactoryService {
  createNewSubject(createSubjectDto: CreateSubjectDto) {
    const newSubject = new Subject();
    newSubject.firstName = createSubjectDto.firstName;
    newSubject.lastName = createSubjectDto.lastName;
    newSubject.email = createSubjectDto.email;
    newSubject.phone = createSubjectDto.phone;
    newSubject.address = createSubjectDto.address;

    return newSubject;
  }

  updateSubject(updateSubjectDto: UpdateSubjectDto) {
    const newSubject = new Subject();
    newSubject.firstName = updateSubjectDto.firstName;
    newSubject.lastName = updateSubjectDto.lastName;
    newSubject.email = updateSubjectDto.email;
    newSubject.phone = updateSubjectDto.phone;

    return newSubject;
  }
}
