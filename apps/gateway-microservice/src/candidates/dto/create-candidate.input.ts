import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCandidateInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  campaign: String;
}
