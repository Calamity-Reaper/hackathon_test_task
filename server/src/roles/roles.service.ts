import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import UserDto from '../users/dtos/user.dto';
import UserQueryDto from '../users/dtos/user-query.dto';

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

  async findUsers(id: number, dto: UserQueryDto) {
    const role = await this.prisma.role.findUniqueOrThrow({
      where: { id },
      include: {
        users: {
          include: {
            user: { include: { roles: { select: { role: { select: { name: true } } } } } },
          },
          orderBy: { [dto.orderBy]: dto.sortOrder },
          take: dto.take,
          skip: dto.skip,
        },
      },
    });

    return role.users.map((ur) => new UserDto(ur.user));
  }
}
