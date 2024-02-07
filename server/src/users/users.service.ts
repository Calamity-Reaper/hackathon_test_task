import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserWithToken } from './types/user-with-token.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateWithoutTokenInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async find(
    where: Prisma.UserWhereUniqueInput,
    withToken: boolean = true,
  ): Promise<UserWithToken> {
    return this.prisma.user.findUniqueOrThrow({ where, include: { token: withToken } });
  }
}
