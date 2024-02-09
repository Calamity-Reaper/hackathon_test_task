import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigValidationSchema } from './common/joi/config-validation.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigValidationSchema,
      cache: true,
    }),
    AppConfigModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    TokensModule,
    RolesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
