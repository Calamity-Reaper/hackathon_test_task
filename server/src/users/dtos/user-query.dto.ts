import QueryDto from '../../common/dtos/query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, Min } from 'class-validator';
import { User } from '@prisma/client';

const orderBy: (keyof User)[] = ['username', 'email', 'createdAt'] as const;

export default class UserQueryDto extends QueryDto {
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
