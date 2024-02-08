import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() accessToken: string;
}
