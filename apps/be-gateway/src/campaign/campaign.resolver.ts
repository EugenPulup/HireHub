import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { Campaign, Count } from './entities/campaign.entity';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { ListCampaignInput } from './dto/list-campaign.input';

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => Campaign)
  async createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
  ) {
    return this.campaignService.create(createCampaignInput);
  }

  @Query(() => [Campaign], { name: 'campaign' })
  async findAll(
    @Args('ListCampaignInput') listCampaignInput: ListCampaignInput,
  ) {
    return this.campaignService.findAll(listCampaignInput);
  }

  @Query(() => Count, { name: 'campaignCount' })
  async total() {
    return { count: this.campaignService.count() };
  }

  @Query(() => Campaign, { name: 'campaignById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.findOne(id);
  }

  @Mutation(() => Campaign)
  async updateCampaign(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
  ) {
    return this.campaignService.update(id, updateCampaignInput);
  }

  @Mutation(() => Boolean)
  async removeCampaign(@Args('id', { type: () => [String] }) id: string[]) {
    const removedEntity = await this.campaignService.remove(id);

    return !!removedEntity.count;
  }
}
