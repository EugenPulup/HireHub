import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  createUnionType,
} from '@nestjs/graphql';

type Providers = 'WORKUA' | 'ROBOTAUA' | 'LINKEDIN';

type CampaignEndType = 'NEVER' | 'DATE' | 'COUNT';

type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ENDED';

@ObjectType()
export class Campaign {
  @Field(() => String)
  id: string;

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

@ObjectType()
export class Count {
  @Field(() => Int)
  count: number;
}
