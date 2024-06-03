import { CreateCampaignInput } from './create-campaign.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCampaignInput extends PartialType(CreateCampaignInput) {
  @Field(() => String)
  id: string;
}
