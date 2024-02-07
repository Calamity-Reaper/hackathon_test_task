import { Prisma } from '@prisma/client';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginRequest
  implements Pick<Prisma.UserCreateWithoutTokenInput, 'username' | 'password'>
{
  @ApiProperty()
  @Length(1, 255)
  username: string;

  @ApiProperty()
  @Length(1, 255)
  password: string;
}
