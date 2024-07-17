import { Field, Int, InputType, Union, createUnionType } from '@nestjs/graphql';

import type { Providers, CampaignEndType } from '@prisma/client';

@InputType()
export class CreateCampaignInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  keyword: string;

  @Field(() => [String])
  providers: Providers[];

  @Field(() => String)
  endType: CampaignEndType;

  @Field(() => Int, { nullable: true })
  endValue?: number;
}
