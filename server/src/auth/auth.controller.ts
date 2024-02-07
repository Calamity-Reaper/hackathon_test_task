import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import SignupRequest from './dtos/signup-request.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AppConfigService } from '../app-config/app-config.service';
import LoginRequest from './dtos/login-request.dto';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthResponse from './dtos/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: AppConfigService,
  ) {}

  @ApiResponse({ status: 201, type: AuthResponse })
  @Post('signup')
  async signup(
    @Body() dto: SignupRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { id, accessToken, refreshToken } = await this.authService.signup(dto);

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { id, accessToken };
  }

  @ApiResponse({ status: 201, type: AuthResponse })
  @Post('login')
  async login(
    @Body() dto: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { id, accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { id, accessToken };
  }

  @ApiResponse({ status: 201, type: AuthResponse })
  @RefreshGuard()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    if (!req.user?.id || !req.user.refreshToken) {
      throw new InternalServerErrorException();
    }

    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user.id,
      req.user.refreshToken,
    );

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { id: req.user.id, accessToken };
  }

  @AccessGuard()
  @Delete('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.authService.logout(req.user.id);
    res.clearCookie(this.config.COOKIE_NAME);
  }
}
