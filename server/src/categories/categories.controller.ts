import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
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
  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number): Promise<CategoryDto> {
    return this.categoriesService.find(id);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(AccessGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: CategoryUpdateDto) {
    await this.categoriesService.update(id, dto);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(AccessGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    await this.categoriesService.delete(id);
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get(':id/lots')
  async getLots(
    @Param('id', new ParseIntPipe()) id: number,
    @Query() dto: LotQueryDto,
  ): Promise<LotDto[]> {
    return this.categoriesService.findLots(id, dto);
  }
}
