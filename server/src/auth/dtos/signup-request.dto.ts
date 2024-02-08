import LoginRequestDto from './login-request.dto';
import { Prisma } from '@prisma/client';
import { IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignupRequestDto
  extends LoginRequestDto
  implements Pick<Prisma.UserCreateWithoutTokenInput, 'username' | 'email' | 'password'>
{
  @ApiProperty({ maxLength: 255 })
  @MaxLength(255)
  @IsEmail()
  email: string;
}
