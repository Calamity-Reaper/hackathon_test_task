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
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import LotUpdateDto from './dtos/lot-update.dto';
import LotQueryDto from './dtos/lot-query.dto';
import LotDto from './dtos/lot.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LotsService } from './lots.service';
import AccessGuard from '../auth/guards/access.guard';
import { Role } from '../roles/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import ParseJsonPipe from '../common/pipes/parse-json.pipe';
import LotCreateDto from './dtos/lot-create.dto';
import { MbToB } from '../common/utils/mb-to-b';

@ApiTags('lots')
@ApiBearerAuth()
@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'string' },
        imgs: { type: 'array', items: { type: 'file', format: 'binary' } },
      },
    },
  })
  @ApiResponse({ status: 201, type: LotDto })
  @UseGuards(AccessGuard)
  @UseInterceptors(FilesInterceptor('imgs'))
  @Post()
  async create(
    @Req() req: Request,
    @Body('data', new ParseJsonPipe(), new ValidationPipe({ transform: true, whitelist: true }))
    dto: LotCreateDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/gm })
        .addMaxSizeValidator({ maxSize: MbToB(5) })
        .build(),
    )
    files: Express.Multer.File[],
  ): Promise<LotDto> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return new LotDto(await this.lotsService.create(req.user.id, dto, files));
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get()
  async getAll(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UseGuards(AccessGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('my/created')
  async getCreated(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UseGuards(AccessGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('my/participated')
  async getParticipated(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: LotDto })
  @Get(':id')
  async get(@Param('id') id: string): Promise<LotDto> {
    return new LotDto(await this.lotsService.find({ id }));
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'string' },
        imgs: { type: 'array', items: { type: 'file', format: 'binary' } },
      },
    },
  })
  @UseGuards(AccessGuard)
  @UseInterceptors(FilesInterceptor('imgs'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body(
      'data',
      new ParseJsonPipe(),
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    dto: LotUpdateDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/gm })
        .addMaxSizeValidator({ maxSize: MbToB(5) })
        .build(),
    )
    files: Express.Multer.File[],
  ) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.lotsService.update(id, req.user.id, dto, files, req.user.roles.includes(Role.Admin));
  }

  @UseGuards(AccessGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.lotsService.delete(id, req.user.id, req.user.roles.includes(Role.Admin));
  }
}
