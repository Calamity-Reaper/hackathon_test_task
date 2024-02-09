import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import SignupRequestDto from './dtos/signup-request.dto';
import LoginRequestDto from './dtos/login-request.dto';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AppConfigService } from '../app-config/app-config.service';
import { TokensService } from '../tokens/tokens.service';
import UserDto from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private config: AppConfigService,
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async signup({ username, email, password }: SignupRequestDto) {
    const hashed = await bcryptjs.hash(password, this.config.PASSWORD_SALT);
    const user = await this.usersService.create({ username, email, password: hashed });
    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    await this.tokensService.create({
      value: await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
      user: { connect: { id: user.id } },
    });

    return { id: user.id, ...tokens, user: new UserDto(user) };
  }

  async login({ email, password }: LoginRequestDto) {
    const user = await this.usersService.find({ email });

    if (!(await bcryptjs.compare(password, user.password))) {
      throw new BadRequestException('invalid password');
    }

    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    if (!user.token) {
      await this.tokensService.create({
        value: await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
        user: { connect: { id: user.id } },
      });
    } else {
      await this.tokensService.update(
        user.id,
        await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
      );
    }

    return { id: user.id, ...tokens, user: new UserDto(user) };
  }

  async refresh(id: string, token: string) {
    const user = await this.usersService.find({ id });

    if (!user.token || !(await bcryptjs.compare(token, user.token.value))) {
      throw new ForbiddenException();
    }

    const tokens = await this.tokensService.signTokens({
      id: user.id,
      roles: user.roles.map((r) => r.role.name),
    });
    await this.tokensService.update(
      user.id,
      await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
    );

    return { ...tokens, user: new UserDto(user) };
  }

  async logout(id: string) {
    await this.tokensService.delete(id);
  }
}
