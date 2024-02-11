import { Prisma } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsPositive, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export default class LotCreateDto implements Omit<Prisma.LotCreateInput, 'seller' | 'categories'> {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  name: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 5000)
  description?: string;

  @ApiProperty({ minimum: 0, exclusiveMinimum: true })
  @IsPositive()
  startBid: number;

  @ApiProperty({ minimum: 0, exclusiveMinimum: true })
  @IsPositive()
  minPitch: number;

  @ApiPropertyOptional({ type: [Number], isArray: true })
  @IsOptional()
  @Transform(({ value }) => value.map(Number))
  @IsPositive({ each: true })
  categories?: number[];

  @ApiProperty()
  @IsDateString()
  closesAt: string;
}
