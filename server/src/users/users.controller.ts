import { Controller, Get, InternalServerErrorException, Req } from '@nestjs/common';
import { AccessGuard } from '../auth/guards/access.guard';
import { UsersService } from './users.service';
import { Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import User from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: User })
  @AccessGuard()
  @Get('me')
  async me(@Req() req: Request): Promise<User> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return new User(await this.usersService.find({ id: req.user.id }, false));
  }
}
