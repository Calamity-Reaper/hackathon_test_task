import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import LotDto from '../lots/dtos/lot.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async find(name: string) {
    return this.prisma.category.findUniqueOrThrow({ where: { name } });
  }

  async update(name: string, data: Prisma.RoleUpdateInput) {
    return this.prisma.category.update({ where: { name }, data });
  }

  async delete(name: string) {
    return this.prisma.category.delete({ where: { name } });
  }

  async findLots(name: string) {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { name },
      include: {
        lots: {
          include: {
            lot: { include: { categories: { select: { category: { select: { name: true } } } } } },
          },
        },
      },
    });

    return category.lots.map((lc) => new LotDto(lc.lot));
  }
}
