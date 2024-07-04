import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { ListCampaignInput } from './dto/list-campaign.input';

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => Campaign)
  createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
  ) {
    return this.campaignService.create(createCampaignInput);
  }

  @Query(() => [Campaign], { name: 'campaign' })
  findAll(@Args('ListCampaignInput') listCampaignInput: ListCampaignInput) {
    return this.campaignService.findAll(listCampaignInput);
  }

  @Query(() => Campaign, { name: 'campaignById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.findOne(id);
  }

  @Mutation(() => Campaign)
  updateCampaign(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
  ) {
    return this.campaignService.update(id, updateCampaignInput);
  }

  @Mutation(() => Campaign)
  removeCampaign(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.remove(id);
  }
}
