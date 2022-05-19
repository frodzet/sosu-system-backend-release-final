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
  CreateNoteDto,
  CreateSubjectDto,
  HealthConditionItem,
  Subject,
  UpdateAddressDto,
  UpdateFunctionAbilityItemDto,
  UpdateGeneralInfoDto,
  UpdateHealthConditionItemDto,
  UpdateNoteDto,
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

  /* General Information */
  @Get(':subjectId/general-information')
  async findAllGeneralInformation(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findAllGeneralInformation(subjectId);
  }

  @Get(':subjectId/general-information/:generalInfoId')
  async findOneGeneralInformation(
    @Param('subjectId') subjectId: string,
    @Param('generalInfoId') generalInfoId: string,
  ) {
    return this.subjectsService.findOneGeneralInformation(
      subjectId,
      generalInfoId,
    );
  }

  /* Health Conditions */
  @Get(':subjectId/health-conditions')
  async findAllHealthConditions(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findAllHealthConditions(subjectId);
  }

  @Get(':subjectId/health-conditions/:healthConditionId')
  async findOneHealthCondition(
    @Param('subjectId') subjectId: string,
    @Param('healthConditionId') healthConditionId: string,
  ) {
    return this.subjectsService.findOneHealthCondition(
      subjectId,
      healthConditionId,
    );
  }

  @Get(':subjectId/health-conditions/:healthConditionId/:healthConditionItemId')
  async findOneHealthConditionItem(
    @Param('subjectId') subjectId: string,
    @Param('healthConditionId') healthConditionId: string,
    @Param('healthConditionItemId') healthConditionItemId: string,
  ) {
    return this.subjectsService.findOneHealthConditionItem(
      subjectId,
      healthConditionId,
      healthConditionItemId,
    );
  }

  /* Function Abilities */
  @Get(':subjectId/function-abilities')
  async findAllFunctionAbilities(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findAllFunctionAbilities(subjectId);
  }

  @Get(':subjectId/function-abilities/:functionAbilityId/')
  async findOneFunctionAbility(
    @Param('subjectId') subjectId: string,
    @Param('functionAbilityId') functionAbilityId: string,
  ) {
    return this.subjectsService.findOneFunctionAbility(
      subjectId,
      functionAbilityId,
    );
  }

  @Get(
    ':subjectId/function-abilities/:functionAbilityId/:functionAbilityItemId',
  )
  async findOneFunctionAbilityItem(
    @Param('subjectId') subjectId: string,
    @Param('functionAbilityId') functionAbilityId: string,
    @Param('functionAbilityItemId') functionAbilityItemId: string,
  ) {
    return this.subjectsService.findOneFunctionAbilityItem(
      subjectId,
      functionAbilityId,
      functionAbilityItemId,
    );
  }

  @Patch(':subjectId/general-information/:generalInfoId')
  async updateGeneralInfo(
    @Param('subjectId') subjectId: string,
    @Param('generalInfoId') generalInfoId: string,
    @Body() updateGeneralInfoDto: UpdateGeneralInfoDto,
  ) {
    return this.subjectsService.updateGeneralInformation(
      subjectId,
      generalInfoId,
      updateGeneralInfoDto,
    );
  }

  @Patch(
    ':subjectId/health-conditions/:healthConditionId/:healthConditionItemId',
  )
  async updateHealthConditionItem(
    @Param('subjectId') subjectId: string,
    @Param('healthConditionId') healthConditionId: string,
    @Param('healthConditionItemId') healthConditionItemId: string,
    @Body() updateHealthConditionItemDto: UpdateHealthConditionItemDto,
  ) {
    return this.subjectsService.updateHealthConditionItem(
      subjectId,
      healthConditionId,
      healthConditionItemId,
      updateHealthConditionItemDto,
    );
  }

  @Patch(
    ':subjectId/health-conditions/:functionAbilityId/:functionAbilityItemId',
  )
  async updateFunctionAbilityItem(
    @Param('subjectId') subjectId: string,
    @Param('functionAbilityId') functionAbilityId: string,
    @Param('functionAbilityItemId') functionAbilityItemId: string,
    @Body() updateFunctionAbilityItemDto: UpdateFunctionAbilityItemDto,
  ) {
    return this.subjectsService.updateFunctionAbilityItem(
      subjectId,
      functionAbilityId,
      functionAbilityItemId,
      updateFunctionAbilityItemDto,
    );
  }
}
