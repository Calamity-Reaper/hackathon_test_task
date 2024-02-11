import { ApiProperty } from '@nestjs/swagger';
import { User } from '../types/user.prisma-types';

export default class UserBidderDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  username: string;

  @ApiProperty({ maxLength: 255 })
  email: string;

  @ApiProperty({ nullable: true, example: null })
  avatar: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
  }
}
