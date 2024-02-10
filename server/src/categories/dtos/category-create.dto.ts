import { Prisma } from '@prisma/client';
import { IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CategoryCreateDto implements Prisma.CategoryCreateInput {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  name: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  description?: string;
}
