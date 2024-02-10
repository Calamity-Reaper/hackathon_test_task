import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export default class CategoryUpdateDto implements Prisma.CategoryUpdateInput {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  description?: string;
}
