import { CreateCampaignInput } from './create-campaign.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCampaignInput extends PartialType(CreateCampaignInput) {
  @Field(() => Int)
  id: number;
}
