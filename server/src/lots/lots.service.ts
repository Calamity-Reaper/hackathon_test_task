import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Lot } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';
import LotQueryDto from './dtos/lot-query.dto';
import LotCreateDto from './dtos/lot-create.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class LotsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(userId: string, dto: LotCreateDto, files: Express.Multer.File[]): Promise<Lot> {
    const categories = dto.categories
      ? { create: dto.categories.map((c) => ({ category: { connect: { name: c } } })) }
      : { create: { category: { connect: { name: 'other' } } } };

    const lot = await this.prisma.lot.create({
      data: {
        name: dto.name,
        description: dto.description,
        sellerId: userId,
        startBid: dto.startBid,
        minPitch: dto.minPitch,
        closesAt: new Date(dto.closesAt),
        categories,
      },
      include: { categories: { select: { category: { select: { name: true } } } } },
    });

    const images: string[] = [];
    for (const file of files) {
      images.push(await this.filesService.save(file));
    }

    await this.prisma.lot.update({ where: { id: lot.id }, data: { images } });

    lot.images = images;

    return lot;
  }

  async find(where: Prisma.LotWhereUniqueInput): Promise<Lot> {
    return this.prisma.lot.findUniqueOrThrow({
      where,
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async update(
    id: string,
    requesterId: string,
    dto: LotUpdateDto,
    files: Express.Multer.File[],
    force?: boolean,
  ) {
    let lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    if (lot.sellerId !== requesterId && !force) {
      throw new ForbiddenException();
    }

    let categories;
    if (dto.categories) {
      categories = {
        create: dto.categories.map((c) => ({ category: { connect: { name: c } } })),
      };

      await this.prisma.lotCategory.deleteMany({ where: { lotId: lot.id } });
    }

    for (const file of lot.images) {
      await this.filesService.delete(file);
    }
    const images: string[] = [];
    for (const file of files) {
      images.push(await this.filesService.save(file));
    }

    if (dto.categories) {
      await this.prisma.lot.update({ where: { id }, data: { ...dto, categories } });
    } else {
      await this.prisma.lot.update({ where: { id }, data: { ...dto, categories: undefined } });
    }

    lot = await this.prisma.lot.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        startBid: dto.startBid,
        minPitch: dto.minPitch,
        closesAt: dto.closesAt ? new Date(dto.closesAt) : undefined,
        categories,
        images,
      },
      include: { categories: { select: { category: { select: { name: true } } } } },
    });

    return lot;
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
