import { Field, Int, InputType, Union, createUnionType } from '@nestjs/graphql';

import { Providers, CampaignEndType } from '@hirehub/prisma';

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
