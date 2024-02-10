import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import LotQueryDto from '../lots/dtos/lot-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  @Post()
  async create() {}

  @Get()
  async getAll() {}

  @Get(':name')
  async get() {}

  @Patch(':name')
  async update() {}

  @Delete(':name')
  async delete() {}

  @Get(':name/lots')
  async getLots(@Param('name') name: string, @Query() dto: LotQueryDto) {}
}
