import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import UserDto from './dtos/user.dto';
import AccessGuard from '../auth/guards/access.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(AccessGuard)
  @Get('me')
  async me(@Req() req: Request): Promise<UserDto> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return new UserDto(await this.usersService.find({ id: req.user.id }, false));
  }
}
