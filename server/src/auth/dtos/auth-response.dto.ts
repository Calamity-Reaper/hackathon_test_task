import { ApiProperty } from '@nestjs/swagger';
import UserDto from '../../users/dtos/user.dto';

export default class AuthResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() accessToken: string;
  @ApiProperty() user: UserDto;
}
