import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateInput } from './dto/create-candidate.input';
import {
  RmqRecordBuilder,
  ClientProxy,
  Transport,
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class CandidatesConsumer {
  constructor(private readonly candidatesService: CandidatesService) {}

  @MessagePattern('candidate:save', Transport.RMQ)
  async createCandidate(
    @Payload() data: CreateCandidateInput,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.candidatesService.create(data);
    } catch (error) {
    } finally {
      return true;
    }
  }
}
