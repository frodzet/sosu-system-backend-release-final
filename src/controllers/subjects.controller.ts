import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from '../services/use-cases/subjects/subjects.service';
import {
  CreateSubjectDto,
  HealthConditionItem,
  Subject,
  UpdateAddressDto,
  UpdateHealthConditionItemDto,
  UpdateSubjectDto,
} from '../core';
import JwtAuthenticationGuard from '../services/authentication/jwt/jwt-auth.guard';
import { Roles } from '../services/authentication/roles/roles.decorator';
import Role from '../services/authentication/roles/role.enum';

@Controller('api/subjects')
@UseGuards(JwtAuthenticationGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':subjectId')
  findOne(@Param('subjectId') subjectId: string): Promise<Subject> {
    return this.subjectsService.findOne(subjectId);
  }

  @Patch(':subjectId')
  update(
    @Param('subjectId') subjectId: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(subjectId, updateSubjectDto);
  }

  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }

  @Get(':subjectId/health-conditions')
  findAllHealthConditions(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findAllHealthConditions(subjectId);
  }

  // @Get(':subjectId/health-conditions/:itemId')
  // findHealthCondition(
  //   @Param('subjectId') subjectId: string,
  //   @Param('itemId') itemId: string,
  // ) {
  //   return this.subjectsService.findHealthCondition(subjectId, itemId);
  // }

  @Get(':subjectId/health-conditions/:index')
  findHealthCondition(
    @Param('subjectId') subjectId: string,
    @Param('index') index: number,
  ) {
    return this.subjectsService.findHealthCondition(subjectId, index);
  }
}
