import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserDto from './dtos/user.dto';
import AccessGuard from '../auth/guards/access.guard';
import RolesGuard from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import UserUpdateDto from './dtos/user-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MbToB } from '../common/utils/mb-to-b';

@ApiTags('users')
@ApiBearerAuth()
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

  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { img: { type: 'file', format: 'binary' } } } })
  @ApiResponse({ type: String })
  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('img'))
  async setMyAvatar(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/gm })
        .addMaxSizeValidator({ maxSize: MbToB(5) })
        .build(),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return this.usersService.setAvatar(req.user.id, file);
  }

  @Delete('me/avatar')
  async deleteMyAvatar(@Req() req: Request) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.usersService.deleteAvatar(req.user.id);
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete({ id });
  }

  @ApiOperation({ description: 'admin' })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string) {
    await this.usersService.deleteAvatar(id);
  }
}
