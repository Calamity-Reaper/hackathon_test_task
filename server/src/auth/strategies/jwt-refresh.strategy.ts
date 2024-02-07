import { PassportStrategy } from '@nestjs/passport';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../app-config/app-config.service';
import { TokenPayload } from '../../tokens/types/token-payload.interface';
import { Request } from 'express';

export const ExtractJwtFromCookie =
  (cookie_name: string): JwtFromRequestFunction<Request> =>
  (req: Request): string | null =>
    req.cookies[cookie_name] || null;

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwtFromCookie(config.COOKIE_NAME),
      secretOrKey: config.JWT_REFRESH_SECRET,
      algorithms: [config.JWT_ALGORITHM],
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: TokenPayload) {
    return { ...payload, refreshToken: ExtractJwtFromCookie(this.config.COOKIE_NAME)(req) };
  }
}
