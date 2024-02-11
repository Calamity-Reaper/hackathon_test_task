import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LotsModule } from '../lots/lots.module';

@Module({
  imports: [PrismaModule, LotsModule],
  providers: [BidsService],
  controllers: [BidsController],
})
export class BidsModule {}
