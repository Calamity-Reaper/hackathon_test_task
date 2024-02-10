import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Lot } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class LotsService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService,
  ) {}

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

  async update(id: string, requesterId: string, dto: LotUpdateDto, force?: boolean) {
    const lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    if (lot.sellerId !== requesterId && !force) {
      throw new ForbiddenException();
    }

    // const cats = await this.prisma.lotCategory.findMany({
    //   where: { lotId: lot.id },
    //   include: { category: true },
    // });

    // await this.prisma.lot.update({
    //   where: { id },
    //   data: {
    //     ...dto,
    //     categories: dto.categories
    //       ? {
    //           create: dto.categories.map((c) => ({ category: { connect: { name: c } } })),
    //         }
    //       : undefined,
    //   },
    // });
  }

  async delete(id: string, requesterId: string, force?: boolean) {
    const lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    if (lot.sellerId !== requesterId && !force) {
      throw new ForbiddenException();
    }

    await this.prisma.lot.delete({ where: { id } });
  }
}
