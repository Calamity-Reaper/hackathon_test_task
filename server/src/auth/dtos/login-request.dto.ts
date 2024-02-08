import { Prisma } from '@prisma/client';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginRequestDto
  implements Pick<Prisma.UserCreateWithoutTokenInput, 'username' | 'password'>
{
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  username: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  password: string;
}
