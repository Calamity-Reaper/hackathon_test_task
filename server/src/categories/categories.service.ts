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

  async find(id: number) {
    return this.prisma.category.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  async findLots(id: number) {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id },
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
