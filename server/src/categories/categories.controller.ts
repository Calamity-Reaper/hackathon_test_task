import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import LotQueryDto from '../lots/dtos/lot-query.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AccessGuard from '../auth/guards/access.guard';
import RolesGuard from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import CategoryDto from './dtos/category.dto';
import CategoryCreateDto from './dtos/category-create.dto';
import { CategoriesService } from './categories.service';
import CategoryUpdateDto from './dtos/category-update.dto';
import LotDto from '../lots/dtos/lot.dto';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ description: 'admin' })
  @ApiResponse({ status: 201, type: CategoryDto })
  @Roles(Role.Admin)
  @UseGuards(AccessGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CategoryCreateDto): Promise<CategoryDto> {
    return this.categoriesService.create(dto);
  }

  @ApiResponse({ status: 200, type: [CategoryDto] })
  @Get()
  async getAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @ApiResponse({ status: 200, type: CategoryDto })
  @Get(':name')
  async get(@Param('name') name: string): Promise<CategoryDto> {
    return this.categoriesService.find(name);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(AccessGuard, RolesGuard)
  @Patch(':name')
  async update(@Param('name') name: string, @Body() dto: CategoryUpdateDto) {
    await this.categoriesService.update(name, dto);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(AccessGuard, RolesGuard)
  @Delete(':name')
  async delete(@Param('name') name: string) {
    await this.categoriesService.delete(name);
  }

  @ApiResponse({ status: 200, type: [CategoryDto] })
  @Get(':name/lots')
  async getLots(@Param('name') name: string, @Query() dto: LotQueryDto): Promise<LotDto[]> {
    return this.categoriesService.findLots(name);
  }
}
