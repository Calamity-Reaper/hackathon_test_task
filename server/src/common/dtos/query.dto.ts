import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { sortOrder } from '../constants';
import { Transform } from 'class-transformer';

export default class QueryDto {
  @ApiPropertyOptional({ enum: sortOrder, description: 'default: asc' })
  @Transform(({ value }) => (!value ? 'asc' : value))
  @IsOptional()
  @IsIn(sortOrder)
  sortOrder: (typeof sortOrder)[number];
}
