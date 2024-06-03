import { Field, Int, InputType, Union, createUnionType } from '@nestjs/graphql';

// enum CampaignStatus {
//   ACTIVE,
//   PAUSED,
//   DELETED,
//   ENDED,
// }

// enum CampaignEndType {
//   NEVER,
//   DATE,
//   COUNT,
// }

// enum Providers {
//   WORKUA,
//   ROBOTAUA,
//   LINKEDIN,
// }

type Providers = 'WORKUA' | 'ROBOTAUA' | 'LINKEDIN';

type CampaignEndType = 'NEVER' | 'DATE' | 'COUNT';

type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ENDED';

// registerEnumType(CampaignStatus, {
//   name: 'CampaignStatus',
// });

// registerEnumType(CampaignEndType, {
//   name: 'CampaignEndType',
// });

// registerEnumType(Providers, {
//   name: 'Providers',
// });

@InputType()
export class CreateCampaignInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  keyword: string;

  @Field(() => [String])
  providers: Providers[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  status: CampaignStatus;

  @Field(() => String)
  endType: CampaignEndType;

  @Field(() => Int, { nullable: true })
  endValue?: number;
}
