import { Prisma, State } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsPositive, Length } from 'class-validator';

export default class LotUpdateDto implements Omit<Prisma.LotUpdateInput, 'categories'> {
  @ApiPropertyOptional({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 255, nullable: true })
  @IsOptional()
  @Length(1, 255)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(1, 255, { each: true })
  categories?: string[];

  @ApiPropertyOptional({ minimum: 0, exclusiveMinimum: true })
  @IsOptional()
  @IsPositive()
  startBid?: number;

  @ApiPropertyOptional({ minimum: 0, exclusiveMinimum: true })
  @IsOptional()
  @IsPositive()
  minPitch?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  closesAt?: Date;

  @ApiPropertyOptional({ enum: State })
  @IsOptional()
  @IsEnum(State)
  state?: State;
}
