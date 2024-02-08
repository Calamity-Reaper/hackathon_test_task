import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserWithToken } from './types/user.prisma-types';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateWithoutTokenInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        roles: { create: { role: { connect: { name: Role.User } } } },
      },
      include: { roles: { select: { role: { select: { name: true } } } } },
    });
  }

  async find(
    where: Prisma.UserWhereUniqueInput,
    withToken: boolean = true,
  ): Promise<UserWithToken> {
    return this.prisma.user.findUniqueOrThrow({
      where,
      include: { roles: { select: { role: { select: { name: true } } } }, token: withToken },
    });
  }
}
