import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import BidCreateDto from './dtos/bid-create.dto';
import { LotsService } from '../lots/lots.service';

@Injectable()
export class BidsService {
  constructor(
    private prisma: PrismaService,
    private lotsService: LotsService,
  ) {}

  async create(userId: string, dto: BidCreateDto) {
    const lot = await this.lotsService.updateState(dto.lotId);

    if (lot.state !== 'OPEN') {
      throw new BadRequestException('lot must be open');
    }

    if (lot.lastBid && lot.lastBid >= dto.amount) {
      throw new BadRequestException('bid must be higher than last bid');
    }

    if (lot.sellerId === userId) {
      throw new ForbiddenException('you can not place a bid on your lot');
    }

    return this.prisma.bid.create({ data: { userId, ...dto } });
  }
}
