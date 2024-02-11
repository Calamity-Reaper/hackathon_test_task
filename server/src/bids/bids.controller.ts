import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import BidCreateDto from './dtos/bid-create.dto';
import { BidsService } from './bids.service';
import AccessGuard from '../auth/guards/access.guard';
import { Request } from 'express';
import BidDto from './dtos/bid.dto';

@ApiTags('bids')
@ApiBearerAuth()
@Controller('bids')
export class BidsController {
  constructor(private bidsService: BidsService) {}

  @ApiResponse({ type: BidDto })
  @UseGuards(AccessGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post()
  async place(@Req() req: Request, @Body() dto: BidCreateDto): Promise<BidDto> {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    return this.bidsService.create(req.user.id, dto);
  }
}
