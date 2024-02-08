import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class RoleDto implements Role {
  @ApiProperty()
  id: number;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  name: string;

  @ApiProperty({ nullable: true, example: null, minLength: 1, maxLength: 255 })
  description: string | null;
}
