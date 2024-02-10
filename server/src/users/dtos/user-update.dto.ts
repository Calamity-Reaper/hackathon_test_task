import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export default class UserUpdateDto implements Prisma.UserUpdateInput {
  @ApiPropertyOptional({ minLength: 1, maxLength: 255 })
  @IsOptional()
  @Length(1, 255)
  username?: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsOptional()
  @MaxLength(255)
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ minLength: 8, maxLength: 255 })
  @IsOptional()
  @Length(8, 255)
  password?: string;
}
