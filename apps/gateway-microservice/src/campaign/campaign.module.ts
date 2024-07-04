import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule],
  providers: [CampaignResolver, CampaignService],
})
export class CampaignModule {}
