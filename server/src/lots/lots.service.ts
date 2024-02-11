import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, State } from '@prisma/client';
import { Lot, LotWithSeller } from './types/lot.prisma-types';
import LotUpdateDto from './dtos/lot-update.dto';
import LotQueryDto from './dtos/lot-query.dto';
import LotCreateDto from './dtos/lot-create.dto';
import { FilesService } from '../files/files.service';
import BidQueryDto from '../bids/dtos/bid-query.dto';
import { Cron } from '@nestjs/schedule';

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

  async find(where: Prisma.LotWhereUniqueInput): Promise<LotWithSeller> {
    return this.prisma.lot.findUniqueOrThrow({
      where,
      include: {
        categories: { select: { category: { select: { name: true } } } },
        seller: { select: { id: true, username: true, email: true, avatar: true } },
      },
    });
  }

  async update(
    id: string,
    requesterId: string,
    dto: LotUpdateDto,
    files: Express.Multer.File[],
    force?: boolean,
  ): Promise<Lot>  {
    const lot = await this.prisma.lot.findUniqueOrThrow({ where: { id } });

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

    if (lot.closesAt.getTime() <= Date.now()) {
      lot.state = State.CLOSED;
    }

    return this.prisma.lot.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        startBid: dto.startBid,
        minPitch: dto.minPitch,
        closesAt: dto.closesAt ? new Date(dto.closesAt) : undefined,
        categories,
        state: lot.state,
        images: files.length ? lot.images : undefined,
      },
      include: { categories: { select: { category: { select: { name: true } } } } },
    });
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
    return this.prisma.lot.findMany({
      where: {
        name: { contains: dto.name, mode: 'insensitive' },
      },
      orderBy: { [dto.orderBy]: dto.sortOrder },
      take: dto.take,
      skip: dto.skip,
      include: {
        categories: { select: { category: { select: { name: true } } } },
        seller: { select: { id: true, username: true, email: true, avatar: true } },
      },
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
      include: {
        categories: { select: { category: { select: { name: true } } } },
        seller: { select: { id: true, username: true, email: true, avatar: true } },
      },
    });
  }

  async findBids(id: string, dto: BidQueryDto) {
    const lot = await this.prisma.lot.findUniqueOrThrow({
      where: { id },
      include: {
        bids: {
          include: { user: { select: { id: true, username: true, email: true, avatar: true } } },
          orderBy: { [dto.orderBy]: dto.sortOrder },
          take: dto.take,
          skip: dto.skip,
        },
      },
    });

    return lot.bids;
  }

  @Cron('* * 1 * * *')
  private updateStates() {
    this.prisma.lot.updateMany({
      where: { state: State.OPEN, closesAt: { lte: new Date() } },
      data: { state: State.CLOSED },
    });
  }
}
