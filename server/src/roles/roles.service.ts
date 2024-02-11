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

  async find(id: number): Promise<Role> {
    return this.prisma.role.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async findUsers(id: number) {
    const role = await this.prisma.role.findUniqueOrThrow({
      where: { id },
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
