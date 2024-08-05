import { Controller } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateInput } from './dto/create-candidate.input';
import {
  Transport,
  EventPattern,
  KafkaContext,
  Payload,
  Ctx,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Consumer');

@Controller()
export class CandidatesConsumer {
  constructor(private readonly candidatesService: CandidatesService) {}

  @EventPattern('candidate_action_save', Transport.KAFKA)
  async createCandidate(
    @Payload() data: CreateCandidateInput,
    @Ctx() context: KafkaContext,
  ) {
    try {
      logger.log(`Input Data: ${JSON.stringify(data)}`);
      await this.candidatesService.create(data);
    } catch (error) {
      logger.error(error);
    } finally {
      return true;
    }
  }
}
