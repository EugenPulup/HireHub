import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidatesService } from './candidates.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Transport } from '@nestjs/microservices';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

@Resolver(() => Candidate)
export class CandidatesResolver {
  constructor(private readonly candidatesService: CandidatesService) {}

  @MessagePattern('candidate:save', Transport.RMQ)
  async createCandidate(
    @Payload() data: CreateCandidateInput,
    @Ctx() context: RmqContext,
  ) {
    this.candidatesService.create(data);
  }

  @Query(() => [Candidate], { name: 'candidates' })
  findAll() {
    return this.candidatesService.findAll();
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
