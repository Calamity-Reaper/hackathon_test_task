import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import SignupRequest from './dtos/signup-request.dto';
import LoginRequest from './dtos/login-request.dto';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AppConfigService } from '../app-config/app-config.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private config: AppConfigService,
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async signup({ username, email, password }: SignupRequest) {
    const hashed = await bcryptjs.hash(password, this.config.PASSWORD_SALT);
    const user = await this.usersService.create({ username, email, password: hashed });
    const tokens = await this.tokensService.signTokens({ id: user.id });
    await this.tokensService.create({
      value: await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
      user: { connect: { id: user.id } },
    });

    return { id: user.id, ...tokens };
  }

  async login({ username, password }: LoginRequest) {
    const user = await this.usersService.find({ username });

    if (!(await bcryptjs.compare(password, user.password))) {
      throw new BadRequestException('invalid password');
    }

    const tokens = await this.tokensService.signTokens({ id: user.id });
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

    return { id: user.id, ...tokens };
  }

  async refresh(id: string, token: string) {
    const user = await this.usersService.find({ id });

    console.log(user);

    if (!user.token || !(await bcryptjs.compare(token, user.token.value))) {
      throw new ForbiddenException();
    }

    const tokens = await this.tokensService.signTokens({ id: user.id });
    await this.tokensService.update(
      user.id,
      await bcryptjs.hash(tokens.refreshToken, this.config.TOKEN_SALT),
    );

    return tokens;
  }

  async logout(id: string) {
    await this.tokensService.delete(id);
  }
}
