import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';

@Module({
  providers: [CampaignResolver, CampaignService],
})
export class CampaignModule {}
