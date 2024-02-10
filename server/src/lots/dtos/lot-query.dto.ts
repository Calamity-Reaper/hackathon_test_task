import QueryDto from '../../common/dtos/query.dto';
import { Lot } from '@prisma/client';
import { IsIn, IsOptional, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

const orderBy: (keyof Lot)[] = ['name', 'startBid', 'closesAt', 'createdAt', 'updatedAt'] as const;

export default class LotQueryDto extends QueryDto {
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional({ enum: orderBy, description: 'default - createdAt' })
  @Transform(({ value }) => (!value ? 'createdAt' : value))
  @IsOptional()
  @IsIn(orderBy)
  orderBy: (typeof orderBy)[number];

  @ApiPropertyOptional({
    type: String,
    example: 'other,tech',
    description: 'comma-separated array',
  })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @Length(1, 255, { each: true })
  categories?: string[];
}
