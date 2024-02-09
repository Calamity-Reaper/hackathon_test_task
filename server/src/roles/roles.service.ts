import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import UserDto from '../users/dtos/user.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async find(name: string): Promise<Role> {
    return this.prisma.role.findUniqueOrThrow({ where: { name } });
  }

  async update(name: string, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({ where: { name }, data });
  }

  async findUsers(name: string) {
    const role = await this.prisma.role.findUniqueOrThrow({
      where: { name },
      include: {
        users: {
          include: {
            user: { include: { roles: { select: { role: { select: { name: true } } } } } },
          },
        },
      },
    });

    return role.users.map((ur) => new UserDto(ur.user));
  }
}
