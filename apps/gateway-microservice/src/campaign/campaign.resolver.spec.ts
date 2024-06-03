import { Test, TestingModule } from '@nestjs/testing';
import { CampaignResolver } from './campaign.resolver';
import { CampaignService } from './campaign.service';

describe('CampaignResolver', () => {
  let resolver: CampaignResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignResolver, CampaignService],
    }).compile();

    resolver = module.get<CampaignResolver>(CampaignResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
