import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponse {
  @ApiProperty() id: string;
  @ApiProperty() accessToken: string;
}
