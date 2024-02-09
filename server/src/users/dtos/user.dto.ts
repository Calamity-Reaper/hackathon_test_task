import { User } from '../types/user.prisma-types';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDto implements Omit<User, 'password' | 'roles'> {
  @ApiProperty()
  id: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  username: string;

  @ApiProperty({ maxLength: 255 })
  email: string;

  @ApiProperty({ nullable: true, example: null })
  avatar: string | null;

  @ApiProperty({ isArray: true, type: String })
  roles: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
    this.roles = user.roles.map((ur) => ur.role.name);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
