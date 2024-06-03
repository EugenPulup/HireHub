import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';

import { IsEmail, IsNotEmpty } from 'class-validator';

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

@InputType()
export class CreateCampaignInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  keyword: string;

  @Field(() => [Providers])
  @IsNotEmpty()
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
