import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import RoleUpdateDto from './dtos/role-update.dto';
import AccessGuard from '../auth/guards/access.guard';
import RolesGuard from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RoleDto from './dtos/role.dto';
import UserDto from '../users/dtos/user.dto';
import UserQueryDto from '../users/dtos/user-query.dto';

@ApiTags('roles')
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
  @Get(':name')
  async get(@Param('name') name: string): Promise<RoleDto> {
    return this.rolesService.find(name);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch(':name')
  async update(@Param('name') name: string, @Body() dto: RoleUpdateDto) {
    await this.rolesService.update(name, dto);
  }

  @ApiResponse({ status: 200, type: [UserDto] })
  @Get(':name/users')
  async getUsers(@Param('name') name: string, @Query() dto: UserQueryDto): Promise<UserDto[]> {
    return this.rolesService.findUsers(name);
  }
}
