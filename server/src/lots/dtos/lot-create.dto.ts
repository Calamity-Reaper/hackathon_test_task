import { Prisma } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPositive, Length } from 'class-validator';

export default class LotCreateDto implements Omit<Prisma.LotCreateInput, 'seller'> {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  name: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 255, nullable: true })
  @IsOptional()
  @Length(1, 255)
  description?: string;

  @ApiProperty({ minimum: 0, exclusiveMinimum: true })
  @IsPositive()
  startBid: number;

  @ApiProperty({ minimum: 0, exclusiveMinimum: true })
  @IsPositive()
  minPitch: number;

  @ApiProperty()
  @IsDate()
  closesAt: Date;
}
