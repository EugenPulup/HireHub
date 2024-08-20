import { Field, Int, InputType } from '@nestjs/graphql';

import type { CampaignStatus, CampaignEndType } from '@hirehub/prisma';

@InputType()
export class ListCampaignInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;

  @Field(() => String, { nullable: true })
  filterKey: 'status' | 'endType';

  @Field(() => String, { nullable: true })
  filterValue: CampaignStatus | CampaignEndType;

  @Field(() => String, { nullable: true })
  sortKey: 'status' | 'endType' | 'name';

  @Field(() => String, { nullable: true })
  sortValue: CampaignStatus | CampaignEndType | string;
}
