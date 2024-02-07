import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, PrismaModule],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
