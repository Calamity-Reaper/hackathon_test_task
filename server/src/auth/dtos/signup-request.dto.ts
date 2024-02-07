import LoginRequest from './login-request.dto';
import { Prisma } from '@prisma/client';
import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignupRequest
  extends LoginRequest
  implements Pick<Prisma.UserCreateWithoutTokenInput, 'username' | 'email' | 'password'>
{
  @ApiProperty()
  @Length(1, 255)
  @IsEmail()
  email: string;
}
