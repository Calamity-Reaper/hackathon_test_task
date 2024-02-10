import { Prisma } from '@prisma/client';

export type Lot = Prisma.LotGetPayload<{
  include: { categories: { select: { category: { select: { name: true } } } } };
}>;
