import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { SubjectsService } from '../services/use-cases/subjects/subjects.service';
import {
  CreateSubjectDto,
  HealthConditionItem,
  Subject,
  UpdateAddressDto,
  UpdateHealthConditionItemDto,
} from '../core';
import JwtAuthenticationGuard from '../services/authentication/jwt/jwt-auth.guard';
import RequestWithUser from '../services/authentication/requestWithUser.interface';

@Controller('api/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Req() req: RequestWithUser,
  ) {
    return this.subjectsService.create(createSubjectDto, req.user);
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
