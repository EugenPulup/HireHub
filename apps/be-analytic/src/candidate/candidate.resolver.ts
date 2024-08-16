import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { GroupAnalyticInput } from './dto/group-analytic.input';
import {
  Candidate,
  RangeAnalytic,
  GroupByField,
} from './entities/candidate.entity';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}

  @Query(() => [RangeAnalytic], { name: 'candidateRangeAnalytic' })
  async rangeAnalytic(@Args('range', { type: () => Int }) range: number) {
    return await this.candidateService.rangeAnalytic(range);
  }

  @Query(() => [GroupByField], { name: 'GroupByField' })
  async experienceGroups(
    @Args('GroupAnalyticInput') groupAnalyticInput: GroupAnalyticInput,
  ) {
    return await this.candidateService.groupByField(groupAnalyticInput);
  }
}
