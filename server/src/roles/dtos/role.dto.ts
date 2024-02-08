import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class RoleDto implements Role {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true, example: null })
  description: string | null;
}
