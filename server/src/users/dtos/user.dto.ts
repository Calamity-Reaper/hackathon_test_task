import { User } from '../types/user.prisma-types';
import { ApiProperty } from '@nestjs/swagger';
import UserBidderDto from './user-bidder.dto';

export default class UserDto extends UserBidderDto implements Omit<User, 'password' | 'roles'> {
  @ApiProperty({ isArray: true, type: String })
  roles: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(user: User) {
    super(user);
    this.roles = user.roles.map((ur) => ur.role.name);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
