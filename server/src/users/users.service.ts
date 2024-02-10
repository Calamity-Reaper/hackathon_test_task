import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserWithToken } from './types/user.prisma-types';
import { Role } from '../roles/role.enum';
import { AppConfigService } from '../app-config/app-config.service';
import { FilesService } from '../files/files.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private config: AppConfigService,
    private filesService: FilesService,
  ) {}

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

  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password) {
      data.password = await hash(data.password as string, this.config.PASSWORD_SALT);
    }

    return this.prisma.user.update({
      where,
      data,
      include: { roles: { select: { role: { select: { name: true } } } } },
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
      include: { roles: { select: { role: { select: { name: true } } } } },
    });
  }

  async setAvatar(id: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

    if (user.avatar) {
      await this.filesService.delete(user.avatar);
    }

    const avatar = await this.filesService.save(file);

    await this.prisma.user.update({
      where: { id },
      data: { avatar },
    });

    return avatar;
  }

  async deleteAvatar(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

    if (user.avatar) {
      await this.filesService.delete(user.avatar);
    } else {
      return;
    }

    await this.prisma.user.update({ where: { id }, data: { avatar: null } });
  }
}
