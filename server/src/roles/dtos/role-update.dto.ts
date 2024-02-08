import { IsOptional, Length } from 'class-validator';
import { Prisma } from '@prisma/client';

export default class RoleUpdateDto implements Pick<Prisma.RoleUpdateInput, 'name' | 'description'> {
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @Length(1, 255)
  description?: string;
}
