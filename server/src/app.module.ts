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
import { LotsModule } from './lots/lots.module';
import { BidsModule } from './bids/bids.module';
import { CategoriesModule } from './categories/categories.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigValidationSchema,
      cache: true,
    }),
    AppConfigModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    TokensModule,
    RolesModule,
    FilesModule,
    LotsModule,
    BidsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
