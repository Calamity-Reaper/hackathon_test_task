import { Prisma } from '@prisma/client';
import { IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class BidCreateDto implements Omit<Prisma.BidCreateInput, 'user' | 'lot'> {
  @ApiProperty()
  @IsUUID()
  lotId: string;

  @ApiProperty()
  @IsPositive()
  amount: number;
}
