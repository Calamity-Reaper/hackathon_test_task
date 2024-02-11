import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import SignupRequestDto from './dtos/signup-request.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AppConfigService } from '../app-config/app-config.service';
import LoginRequestDto from './dtos/login-request.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthResponseDto from './dtos/auth-response.dto';
import RefreshGuard from './guards/refresh.guard';
import AccessGuard from './guards/access.guard';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: AppConfigService,
  ) {}

  @ApiResponse({ status: 201, type: AuthResponseDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signup')
  async signup(
    @Body() dto: SignupRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user, accessToken, refreshToken } = await this.authService.signup(dto);

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { user, accessToken };
  }

  @ApiResponse({ status: 201, type: AuthResponseDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user, accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { user, accessToken };
  }

  @ApiResponse({ status: 201, type: AuthResponseDto })
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    if (!req.user?.id || !req.user.refreshToken) {
      throw new InternalServerErrorException();
    }

    const { user, accessToken, refreshToken } = await this.authService.refresh(
      req.user.id,
      req.user.refreshToken,
    );

    res.cookie(this.config.COOKIE_NAME, refreshToken, {
      maxAge: this.config.COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'strict',
    });

    return { user, accessToken };
  }

  @UseGuards(AccessGuard)
  @Delete('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.user?.id) {
      throw new InternalServerErrorException();
    }

    await this.authService.logout(req.user.id);
    res.clearCookie(this.config.COOKIE_NAME);
  }
}
