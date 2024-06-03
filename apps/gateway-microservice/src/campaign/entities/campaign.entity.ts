import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Campaign {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
