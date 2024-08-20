import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Candidate {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'Name of candidate' })
  name: string;

  @Field(() => String, { description: 'Position of candidate' })
  position: string;

  @Field(() => Int, { description: 'Salary expectation of candidate' })
  salary: number;

  @Field(() => Int, { description: 'Sum of Candidate experience in years' })
  yearsOfExperience: number;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class Count {
  @Field(() => Int, { description: 'count of candidates' })
  count: number;
}

@ObjectType()
export class RangeAnalytic {
  @Field(() => Int, { description: 'count of candidates' })
  count: number;

  @Field(() => String, { description: 'count of candidates' })
  date: string;
}

@ObjectType()
export class GroupByField {
  @Field(() => String, { description: 'count of candidates' })
  metric: string;

  @Field(() => Int, { description: 'count of candidates' })
  count: number;
}
