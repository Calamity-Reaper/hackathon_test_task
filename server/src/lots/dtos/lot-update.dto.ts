import { Prisma, State } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsPositive, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export default class LotUpdateDto implements Omit<Prisma.LotUpdateInput, 'categories'> {
  @ApiPropertyOptional({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 255, nullable: true })
  @IsOptional()
  @Length(1, 5000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
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
  @IsDateString()
  closesAt?: string;

  @ApiPropertyOptional({ enum: State })
  @IsOptional()
  @IsEnum(State)
  state?: State;
}
