import { Injectable } from '@nestjs/common';
import {
  CreateHealthConditionDto,
  CreateSubjectDto,
  Subject,
  UpdateSubjectDto,
} from '../../../core';
/*
 * To-Do: - Setup reference-id's to other collections in DTO's, rather than creating
 * new Dto's.
 */
@Injectable()
export class SubjectFactoryService {
  createNewSubject(createSubjectDto: CreateSubjectDto) {
    const newSubject = new Subject();
    newSubject.firstName = createSubjectDto.firstName;
    newSubject.lastName = createSubjectDto.lastName;
    newSubject.email = createSubjectDto.email;
    newSubject.phone = createSubjectDto.phone;
    newSubject.address = createSubjectDto.address;
    newSubject.address.city = createSubjectDto.address.city;
    newSubject.address.street = createSubjectDto.address.street;
    newSubject.address.postCode = createSubjectDto.address.postCode;
    newSubject.generalInformation = createSubjectDto.generalInformation;
    newSubject.healthConditions = createSubjectDto.healthConditions;

    return newSubject;
  }

  updateNewSubject(updateSubjectDto: UpdateSubjectDto) {
    const updatedSubject = new Subject();
    updatedSubject.firstName = updateSubjectDto.firstName;
    updatedSubject.lastName = updateSubjectDto.lastName;
    updatedSubject.email = updateSubjectDto.email;
    updatedSubject.phone = updateSubjectDto.phone;
    updatedSubject.address = updateSubjectDto.address;
    updatedSubject.address.city = updateSubjectDto.address.city;
    updatedSubject.address.street = updateSubjectDto.address.street;
    updatedSubject.address.postCode = updateSubjectDto.address.postCode;
    updatedSubject.generalInformation = updateSubjectDto.generalInformation;
    updatedSubject.healthConditions = updateSubjectDto.healthConditions;

    return updatedSubject;
  }

  /* Re-visit these methods - to ensure full Dto support. For now we bypass these by force-setting an ID on creation */
  private generateHealthConditions(
    subjectDto: CreateSubjectDto,
    newSubject: Subject,
  ): CreateHealthConditionDto[] {
    for (
      let healthConditionIndex = 0;
      healthConditionIndex < subjectDto.healthConditions.length;
      healthConditionIndex++
    ) {
      newSubject.healthConditions[healthConditionIndex].title =
        subjectDto.healthConditions[healthConditionIndex].title;
      for (
        let healthConditionItemIndex = 0;
        healthConditionItemIndex <
        subjectDto.healthConditions[healthConditionIndex].healthConditionItems
          .length;
        healthConditionItemIndex++
      ) {
        newSubject.healthConditions[healthConditionIndex].healthConditionItems[
          healthConditionItemIndex
        ].subTitle =
          subjectDto.healthConditions[
            healthConditionIndex
          ].healthConditionItems[healthConditionItemIndex].subTitle;
        newSubject.healthConditions[healthConditionIndex].healthConditionItems[
          healthConditionItemIndex
        ].description =
          subjectDto.healthConditions[
            healthConditionIndex
          ].healthConditionItems[healthConditionItemIndex].description;
        newSubject.healthConditions[healthConditionIndex].healthConditionItems[
          healthConditionItemIndex
        ].reason =
          subjectDto.healthConditions[
            healthConditionIndex
          ].healthConditionItems[healthConditionItemIndex].reason;
        newSubject.healthConditions[healthConditionIndex].healthConditionItems[
          healthConditionItemIndex
        ].relevant =
          subjectDto.healthConditions[
            healthConditionIndex
          ].healthConditionItems[healthConditionItemIndex].relevant;
      }
    }

    return newSubject.healthConditions;
  }
}
