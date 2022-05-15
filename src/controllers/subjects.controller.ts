import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { LocalAuthGuard } from '../services/authentication/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('subjects')
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subjectsService.findOne(+id);
  // }
  //
  @Patch(':addressId')
  update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.subjectsService.updateAddress(addressId, updateAddressDto);
  }

  @Patch(':subjectId/items/:itemId')
  updateItem(
    @Param('subjectId') subjectId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateHealthConditionItemDto,
  ): Promise<HealthConditionItem> {
    return this.subjectsService.updateItem(subjectId, itemId, updateItemDto);
  }
  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }

  @Get(':id/items/:itemId')
  getItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.subjectsService.getItem(id, itemId);
  }
}
