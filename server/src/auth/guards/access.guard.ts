import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AccessGuard = () => applyDecorators(UseGuards(AuthGuard('jwt')));
