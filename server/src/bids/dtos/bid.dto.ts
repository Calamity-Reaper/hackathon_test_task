import { Bid } from '@prisma/client';

export default class BidDto implements Bid {
  id: string;
  userId: string;
  lotId: string;
  amount: number;
  createdAt: Date;
}
