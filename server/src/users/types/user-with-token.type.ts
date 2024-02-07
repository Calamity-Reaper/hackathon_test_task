import { Prisma } from '@prisma/client';

export type UserWithToken = Prisma.UserGetPayload<{ include: { token: true } }>;
