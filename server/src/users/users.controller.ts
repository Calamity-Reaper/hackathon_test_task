import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserDto from './dtos/user.dto';
import AccessGuard from '../auth/guards/access.guard';
import RolesGuard from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import UserUpdateDto from './dtos/user-update.dto';

@ApiTags('users')
@UseGuards(AccessGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @Get('me')
  async getMe(@Req() req: Request): Promise<UserDto> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return new UserDto(await this.usersService.find({ id: req.user.id }, false));
  }

  @Patch('me')
  async updateMe(@Req() req: Request, @Body() dto: UserUpdateDto) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.usersService.update({ id: req.user.id }, dto);
  }

  @Delete('me')
  async deleteMe(@Req() req: Request) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.usersService.delete({ id: req.user.id });
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete({ id });
  }
}
