import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import SignupRequestDto from './dtos/signup-request.dto';
import LoginRequestDto from './dtos/login-request.dto';
import { UsersService } from '../users/users.service';
import { AppConfigService } from '../app-config/app-config.service';
import { TokensService } from '../tokens/tokens.service';
import UserDto from '../users/dtos/user.dto';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private config: AppConfigService,
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async signup({ username, email, password }: SignupRequestDto) {
    const hashed = await hash(password, this.config.PASSWORD_SALT);
    const user = await this.usersService.create({ username, email, password: hashed });
    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    await this.tokensService.create({
      value: await hash(tokens.refreshToken, this.config.TOKEN_SALT),
      user: { connect: { id: user.id } },
    });

    return { user: new UserDto(user), ...tokens };
  }

  async login({ email, password }: LoginRequestDto) {
    const user = await this.usersService.find({ email });

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('invalid password');
    }

    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    if (!user.token) {
      await this.tokensService.create({
        value: await hash(tokens.refreshToken, this.config.TOKEN_SALT),
        user: { connect: { id: user.id } },
      });
    } else {
      await this.tokensService.update(
        user.id,
        await hash(tokens.refreshToken, this.config.TOKEN_SALT),
      );
    }

    return { user: new UserDto(user), ...tokens };
  }

  async refresh(id: string, token: string) {
    const user = await this.usersService.find({ id });

    if (!user.token || !(await compare(token, user.token.value))) {
      throw new ForbiddenException();
    }

    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    await this.tokensService.update(
      user.id,
      await hash(tokens.refreshToken, this.config.TOKEN_SALT),
    );

    return { user: new UserDto(user), ...tokens };
  }

  async logout(id: string) {
    await this.tokensService.delete(id);
  }
}
