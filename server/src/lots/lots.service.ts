import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Lot } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';

@Injectable()
export class LotsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: Prisma.LotCreateWithoutSellerInput): Promise<Lot> {
    return this.prisma.lot.create({
      data: {
        seller: { connect: { id: userId } },
        ...data,
        categories: { create: { category: { connect: { name: 'other' } } } },
      },
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async find(where: Prisma.LotWhereUniqueInput): Promise<Lot> {
    return this.prisma.lot.findUniqueOrThrow({
      where,
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async update(id: string, requesterId: string, dto: LotUpdateDto, admin?: boolean) {
    const lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    if (lot.sellerId !== requesterId && !admin) {
      throw new ForbiddenException();
    }

    await this.prisma.lot.update({
      where: { id },
      data: {
        ...dto,
        categories: dto.categories
          ? {
              create: dto.categories.map((c) => ({ category: { connect: { name: c } } })),
            }
          : undefined,
      },
    });
  }
}
