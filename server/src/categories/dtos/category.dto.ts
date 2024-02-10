import { Category } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class CategoryDto implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  name: string;

  @ApiProperty({ minLength: 1, maxLength: 255, nullable: true })
  description: string | null;
}
