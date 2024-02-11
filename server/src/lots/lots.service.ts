import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, State } from '@prisma/client';
import { Lot } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';
import LotQueryDto from './dtos/lot-query.dto';
import LotCreateDto from './dtos/lot-create.dto';
import { FilesService } from '../files/files.service';
import BidQueryDto from '../bids/dtos/bid-query.dto';

@Injectable()
export class LotsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(userId: string, dto: LotCreateDto, files: Express.Multer.File[]): Promise<Lot> {
    const categories = dto.categories
      ? { create: dto.categories.map((id) => ({ category: { connect: { id } } })) }
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

    for (const file of files) {
      lot.images.push(await this.filesService.save(file));
    }

    await this.prisma.lot.update({
      where: { id: lot.id },
      data: { images: files.length ? lot.images : undefined },
    });

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
        create: dto.categories.map((id) => ({ category: { connect: { id } } })),
      };

      await this.prisma.lotCategory.deleteMany({ where: { lotId: lot.id } });
    }

    if (files.length) {
      for (const file of lot.images) {
        await this.filesService.delete(file);
      }
      lot.images = [];
      for (const file of files) {
        lot.images.push(await this.filesService.save(file));
      }
    }

    let state = lot.state;
    if (lot.closesAt.getTime() <= Date.now()) {
      state = State.CLOSED;
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
        state,
        images: files.length ? lot.images : undefined,
      },
      include: { categories: { select: { category: { select: { name: true } } } } },
    });

    return lot;
  }

  async updateState(id: string) {
    let lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

    let state = lot.state;
    if (lot.closesAt.getTime() <= Date.now()) {
      state = State.CLOSED;
    }

    lot = await this.prisma.lot.update({ where: { id }, data: { state } });

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

    return this.prisma.lot.findMany({
      where: {
        name: { contains: dto.name, mode: 'insensitive' },
      },
      orderBy: { [dto.orderBy]: dto.sortOrder },
      take: dto.take,
      skip: dto.skip,
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async findCreated(id: string, dto: LotQueryDto) {
    return this.prisma.lot.findMany({
      where: {
        name: { contains: dto.name, mode: 'insensitive' },
        sellerId: id,
      },
      orderBy: { [dto.orderBy]: dto.sortOrder },
      take: dto.take,
      skip: dto.skip,
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async findParticipated(id: string, dto: LotQueryDto) {
    return this.prisma.lot.findMany({
      where: { bids: { every: { userId: id } } },
      orderBy: { [dto.orderBy]: dto.sortOrder },
      skip: dto.skip,
      take: dto.take,
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
  }

  async findBids(id: string, dto: BidQueryDto) {
    const lot = await this.prisma.lot.findUniqueOrThrow({
      where: { id },
      include: {
        bids: {
          select: { user: { select: { id: true, username: true, email: true, avatar: true } } },
          orderBy: { [dto.orderBy]: dto.sortOrder },
          take: dto.take,
          skip: dto.skip,
        },
      },
    });

    return lot.bids;
  }
}
