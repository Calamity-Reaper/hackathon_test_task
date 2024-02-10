import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Lot } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';
import { CategoriesService } from '../categories/categories.service';
import LotQueryDto from './dtos/lot-query.dto';

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

    console.log(lot);

    if (dto.categories) {
      await this.prisma.lotCategory.deleteMany({ where: { lotId: lot.id } });

      const categories = {
        create: dto.categories.map((c) => ({ category: { connect: { name: c } } })),
      };

      await this.prisma.lot.update({ where: { id }, data: { ...dto, categories } });
    } else {
      await this.prisma.lot.update({ where: { id }, data: { ...dto, categories: undefined } });
    }
  }

  async delete(id: string, requesterId: string, force?: boolean) {
    const lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    if (lot.sellerId !== requesterId && !force) {
      throw new ForbiddenException();
    }

    await this.prisma.lot.delete({ where: { id } });
  }

  async findAll(dto: LotQueryDto) {
    // const ids = await this.prisma.lotCategory.findMany({
    //   where: { category: { name: { in: ["children's world", "author's"] } } },
    // });
    //
    // console.log(ids, ids.length);
    //
    // const lots = await this.prisma.lot.findMany({ where: { id: { in: ids.map((i) => i.lotId) } } });
    //
    // console.log(lots, lots.length);
    //
    // return this.prisma.lot.findMany({
    //   where: {
    //     name: { contains: dto.name, mode: 'insensitive' },
    //   },
    //   orderBy: { [dto.orderBy]: dto.sortOrder },
    // });
  }
}
