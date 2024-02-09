import LoginRequestDto from './login-request.dto';
import { Prisma } from '@prisma/client';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignupRequestDto
  extends LoginRequestDto
  implements Pick<Prisma.UserCreateWithoutTokenInput, 'username' | 'email' | 'password'>
{
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @Length(1, 255)
  username: string;
}
