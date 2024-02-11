import QueryDto from '../../common/dtos/query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, Min } from 'class-validator';
import { Bid } from '@prisma/client';

const orderBy: (keyof Bid)[] = ['amount', 'createdAt'] as const;

export default class BidQueryDto extends QueryDto {
  @ApiPropertyOptional({ enum: orderBy, description: 'default - createdAt' })
  @Transform(({ value }) => (!value ? 'createdAt' : value))
  @IsOptional()
  @IsIn(orderBy)
  orderBy: (typeof orderBy)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @Min(0)
  take?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Min(0)
  skip?: number;
}
