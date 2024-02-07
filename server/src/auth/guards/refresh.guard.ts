import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const RefreshGuard = () => applyDecorators(UseGuards(AuthGuard('jwt-refresh')));
