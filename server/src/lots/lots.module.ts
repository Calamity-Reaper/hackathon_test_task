import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [PrismaModule, FilesModule],
  providers: [LotsService],
  controllers: [LotsController],
})
export class LotsModule {}
