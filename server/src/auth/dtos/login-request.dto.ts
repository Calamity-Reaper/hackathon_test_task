import { Prisma } from '@prisma/client';
import { IsEmail, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginRequestDto
  implements Omit<Prisma.UserCreateWithoutTokenInput, 'username'>
{
  @ApiProperty({ maxLength: 255 })
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 255 })
  @Length(8, 255)
  password: string;
}
