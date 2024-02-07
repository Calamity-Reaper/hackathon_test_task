import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/token-payload.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokensService {
  constructor(
    private config: AppConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signTokens(payload: TokenPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        algorithm: this.config.JWT_ALGORITHM,
        secret: this.config.JWT_ACCESS_SECRET,
        expiresIn: this.config.JWT_ACCESS_EXPIRES_IN,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        algorithm: this.config.JWT_ALGORITHM,
        secret: this.config.JWT_REFRESH_SECRET,
        expiresIn: this.config.JWT_REFRESH_EXPIRES_IN,
      }),
    };
  }

  async create(data: Prisma.TokenCreateInput) {
    return this.prisma.token.create({ data });
  }

  async update(userId: string, value: string) {
    return this.prisma.token.update({ where: { userId }, data: { value } });
  }

  async delete(userId: string) {
    return this.prisma.token.delete({ where: { userId } });
  }
}
