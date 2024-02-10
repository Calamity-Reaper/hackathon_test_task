import { IsOptional, Length } from 'class-validator';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class RoleUpdateDto implements Prisma.RoleUpdateInput {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  description?: string;
}
