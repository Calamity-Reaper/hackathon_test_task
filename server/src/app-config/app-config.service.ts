import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

  get SALT_LENGTH(): number {
    return this.configService.getOrThrow('SALT_LENGTH');
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
}
