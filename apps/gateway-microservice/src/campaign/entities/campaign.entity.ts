import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

enum CampaignStatus {
  ACTIVE,
  PAUSED,
  DELETED,
  ENDED,
}

enum CampaignEndType {
  NEVER,
  DATE,
  COUNT,
}

enum Providers {
  WORKUA,
  ROBOTAUA,
  LINKEDIN,
}

registerEnumType(CampaignStatus, {
  name: 'CampaignStatus',
});

registerEnumType(CampaignEndType, {
  name: 'CampaignEndType',
});

registerEnumType(Providers, {
  name: 'Providers',
});

@ObjectType()
export class Campaign {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  keyword: string;

  @Field(() => [Providers])
  providers: Providers[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => CampaignStatus)
  status: CampaignStatus;

  @Field(() => CampaignEndType)
  endType: CampaignEndType;

  @Field(() => Int, { nullable: true })
  endValue?: number;
}
