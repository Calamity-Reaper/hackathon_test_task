import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
  include: { roles: { select: { role: { select: { name: true } } } } };
}>;

export type UserWithToken = Prisma.UserGetPayload<{
  include: { roles: { select: { role: { select: { name: true } } } }; token: true };
}>;
