import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import RoleUpdateDto from './dtos/role-update.dto';
import AccessGuard from '../auth/guards/access.guard';
import RolesGuard from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RoleDto from './dtos/role.dto';
import UserDto from '../users/dtos/user.dto';
import UserQueryDto from '../users/dtos/user-query.dto';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(AccessGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiResponse({ status: 200, type: [RoleDto] })
  @Get()
  async getAll(): Promise<RoleDto[]> {
    return this.rolesService.findAll();
  }

  @ApiResponse({ status: 200, type: RoleDto })
  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number): Promise<RoleDto> {
    return this.rolesService.find(id);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: RoleUpdateDto) {
    await this.rolesService.update(id, dto);
  }

  @ApiResponse({ status: 200, type: [UserDto] })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get(':id/users')
  async getUsers(
    @Param('id', new ParseIntPipe()) id: number,
    @Query() dto: UserQueryDto,
  ): Promise<UserDto[]> {
    return this.rolesService.findUsers(id, dto);
  }
}
