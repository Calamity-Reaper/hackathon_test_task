import { State } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Lot } from '../types/lot.prisma-types';

export default class LotDto implements Omit<Lot, 'categories'> {
  @ApiProperty()
  id: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  name: string;

  @ApiProperty({ minLength: 1, maxLength: 255, nullable: true })
  description: string | null;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ minimum: 1 })
  startBid: number;

  @ApiProperty({ minimum: 1 })
  minPitch: number;

  @ApiProperty({ minimum: 1, nullable: true })
  lastBid: number | null;

  @ApiProperty({ enum: State })
  state: State;

  @ApiProperty({ isArray: true })
  images: string[];

  @ApiProperty({ isArray: true })
  categories: string[];

  @ApiProperty()
  closesAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(lot: Lot) {
    this.id = lot.id;
    this.name = lot.name;
    this.description = lot.description;
    this.sellerId = lot.sellerId;
    this.startBid = lot.startBid;
    this.minPitch = lot.minPitch;
    this.lastBid = lot.lastBid;
    this.state = lot.state;
    this.images = lot.images;
    this.categories = lot.categories.map((lt) => lt.category.name);
    this.closesAt = lot.closesAt;
    this.createdAt = lot.createdAt;
    this.updatedAt = lot.updatedAt;
  }
}
