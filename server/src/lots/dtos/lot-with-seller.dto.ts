import LotDto from './lot.dto';
import UserBidderDto from '../../users/dtos/user-bidder.dto';
import { ApiProperty } from '@nestjs/swagger';
import { LotWithSeller } from '../types/lot.prisma-types';

export default class LotWithSellerDto extends LotDto implements Omit<LotWithSeller, 'categories'> {
  @ApiProperty()
  seller: UserBidderDto;

  constructor(lot: LotWithSeller) {
    super(lot);
    this.seller = lot.seller;
  }
}
