import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
// @UseGuards(JwtAuthenticationGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':subjectId')
  async findOne(@Param('subjectId') subjectId: string): Promise<Subject> {
    return this.subjectsService.findOne(subjectId);
  }

  @Patch(':subjectId')
  async update(
    @Param('subjectId') subjectId: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(subjectId, updateSubjectDto);
  }

  //
  @Delete(':subjectId')
  async remove(@Param('subjectId') subjectId: string) {
    return this.subjectsService.remove(subjectId);
  }

  @Get(':subjectId/health-conditions')
  async findAllHealthConditions(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findAllHealthConditions(subjectId);
  }

  @Get(':subjectId/health-conditions/:index')
  async findSingleHealthCondition(
    @Param('subjectId') subjectId: string,
    @Param('index') index: number,
  ) {
    return this.subjectsService.findSingleHealthCondition(subjectId, index);
  }

  @Get(':subjectId/health-conditions/:index/:itemIndex')
  async findSingleHealthConditionItem(
    @Param('subjectId') subjectId: string,
    @Param('index') index: number,
    @Param('itemIndex') itemIndex: number,
  ) {
    return this.subjectsService.findSingleHealthConditionItem(
      subjectId,
      index,
      itemIndex,
    );
  }

  @Put(':subjectId/health-conditions/:index/:itemIndex')
  async updateSingleHealthConditionItem(
    @Param('subjectId') subjectId: string,
    @Param('index') index: number,
    @Param('itemIndex') itemIndex: number,
    @Body() updateHealthConditionItemDto: UpdateHealthConditionItemDto,
  ) {
    return this.subjectsService.updateSingleHealthConditionItem(
      subjectId,
      index,
      itemIndex,
      updateHealthConditionItemDto,
    );
  }
}
