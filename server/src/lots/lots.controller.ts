import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import LotUpdateDto from './dtos/lot-update.dto';
import LotCreateDto from './dtos/lot-create.dto';
import LotQueryDto from './dtos/lot-query.dto';
import LotDto from './dtos/lot.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LotsService } from './lots.service';
import AccessGuard from '../auth/guards/access.guard';

@ApiTags('lots')
@ApiBearerAuth()
@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @ApiResponse({ status: 201, type: LotDto })
  @UseGuards(AccessGuard)
  @Post()
  async create(@Req() req: Request, @Body() dto: LotCreateDto): Promise<LotDto> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return new LotDto(await this.lotsService.create(req.user.id, dto));
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @Get()
  async getAll(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UseGuards(AccessGuard)
  @Get('my/created')
  async getCreated(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: [LotDto] })
  @UseGuards(AccessGuard)
  @Get('my/participated')
  async getParticipated(@Query() dto: LotQueryDto): Promise<LotDto[]> {
    return [];
  }

  @ApiResponse({ status: 200, type: LotDto })
  @Get(':id')
  async get(@Param('id') id: string): Promise<LotDto> {
    return new LotDto(await this.lotsService.find({ id }));
  }

  @UseGuards(AccessGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Req() req: Request, @Body() dto: LotUpdateDto) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.lotsService.update(id, req.user.id, dto);
  }

  @UseGuards(AccessGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
