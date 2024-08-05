import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}

  @Mutation(() => Candidate)
  createCandidate(@Args('createCandidateInput') createCandidateInput: CreateCandidateInput) {
    return this.candidateService.create(createCandidateInput);
  }

  @Query(() => [Candidate], { name: 'candidate' })
  findAll() {
    return this.candidateService.findAll();
  }

  @Query(() => Candidate, { name: 'candidate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.candidateService.findOne(id);
  }

  @Mutation(() => Candidate)
  updateCandidate(@Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput) {
    return this.candidateService.update(updateCandidateInput.id, updateCandidateInput);
  }

  @Mutation(() => Candidate)
  removeCandidate(@Args('id', { type: () => Int }) id: number) {
    return this.candidateService.remove(id);
  }
}
