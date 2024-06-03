import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
} from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';

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
  findAll(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.campaignService.findAll(offset, limit);
  }

  @Query(() => Campaign, { name: 'campaignById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.findOne(id);
  }

  @Mutation(() => Campaign)
  updateCampaign(
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
  ) {
    return this.campaignService.update(
      updateCampaignInput.id,
      updateCampaignInput,
    );
  }

  @Mutation(() => Campaign)
  removeCampaign(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.remove(id);
  }
}
