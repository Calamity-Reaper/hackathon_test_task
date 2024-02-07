import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join, normalize } from 'path';
import { Algorithm } from 'jsonwebtoken';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get PORT(): number {
    return +this.configService.getOrThrow('PORT');
  }

  get COOKIE_NAME(): string {
    return this.configService.getOrThrow('COOKIE_NAME');
  }

  get COOKIE_MAX_AGE(): number {
    return this.configService.getOrThrow('COOKIE_MAX_AGE');
  }

  get PASSWORD_SALT(): number {
    return +this.configService.getOrThrow('PASSWORD_SALT');
  }

  get TOKEN_SALT(): number {
    return +this.configService.getOrThrow('TOKEN_SALT');
  }

  get JWT_ALGORITHM(): Algorithm {
    return this.configService.getOrThrow('JWT_ALGORITHM');
  }

  get JWT_ACCESS_SECRET(): string {
    return this.configService.getOrThrow('JWT_ACCESS_SECRET');
  }

  get JWT_ACCESS_EXPIRES_IN(): string {
    return this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN');
  }

  get JWT_REFRESH_SECRET(): string {
    return this.configService.getOrThrow('JWT_REFRESH_SECRET');
  }

  get JWT_REFRESH_EXPIRES_IN(): string {
    return this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN');
  }

  get SERVE_STATIC_PATH(): string {
    return normalize(
      join(__dirname, '..', '..', this.configService.getOrThrow('SERVE_STATIC_FOLDER')),
    );
  }

  get SERVE_STATIC_PREFIX(): string {
    return '/' + this.configService.getOrThrow('SERVE_STATIC_PREFIX');
  }
}
