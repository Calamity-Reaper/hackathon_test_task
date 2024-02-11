import { Bid } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class BidDto implements Bid {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  lotId: string;

  @ApiProperty({ minimum: 0, exclusiveMinimum: true })
  amount: number;

  @ApiProperty()
  createdAt: Date;
}
