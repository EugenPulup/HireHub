import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCampaignInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
