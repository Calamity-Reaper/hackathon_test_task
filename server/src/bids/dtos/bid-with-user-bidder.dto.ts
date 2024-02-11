import BidDto from './bid.dto';
import UserBidderDto from '../../users/dtos/user-bidder.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class BidWithUserBidderDto extends BidDto {
  @ApiProperty()
  user: UserBidderDto;
}
