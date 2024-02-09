import { ApiProperty } from '@nestjs/swagger';
import UserDto from '../../users/dtos/user.dto';

export default class AuthResponseDto {
  @ApiProperty() user: UserDto;
  @ApiProperty() accessToken: string;
}
