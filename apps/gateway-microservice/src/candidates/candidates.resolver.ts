import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidatesService } from './candidates.service';
import { Candidate } from './entities/candidate.entity';
import { UpdateCandidateInput } from './dto/update-candidate.input';

@Resolver(() => Candidate)
export class CandidatesResolver {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Query(() => [Candidate], { name: 'candidates' })
  async findAll(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return await this.candidatesService.findAll(offset, limit);
  }

  @Query(() => Candidate, { name: 'candidate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.candidatesService.findOne(id);
  }

  @Mutation(() => Candidate)
  updateCandidate(
    @Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput,
  ) {
    return this.candidatesService.update(
      updateCandidateInput.id,
      updateCandidateInput,
    );
  }

  @Mutation(() => Candidate)
  removeCandidate(@Args('id', { type: () => Int }) id: number) {
    return this.candidatesService.remove(id);
  }
}
