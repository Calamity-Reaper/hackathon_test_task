import { Prisma } from '@prisma/client';

export type Lot = Prisma.LotGetPayload<{
  include: { categories: { select: { category: { select: { name: true } } } } };
}>;

export type LotWithSeller = Prisma.LotGetPayload<{
  include: {
    categories: { select: { category: { select: { name: true } } } };
    seller: { select: { id: true; username: true; email: true; avatar: true } };
  };
}>;
