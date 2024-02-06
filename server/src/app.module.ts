import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigValidationSchema } from './common/config-validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigValidationSchema,
      cache: true,
    }),
    AppConfigModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
