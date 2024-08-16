import { Controller } from '@nestjs/common';
import * as moment from 'moment';
import { CandidateService } from './candidate.service';
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
export class CandidateConsumer {
  constructor(private readonly candidateService: CandidateService) {}

  @EventPattern('candidate_create', Transport.KAFKA)
  async createCandidate(
    @Payload() data: CreateCandidateInput,
    @Ctx() context: KafkaContext,
  ) {
    try {
      logger.log(`Input Data: ${JSON.stringify(data)}`);

      logger.log(
        `Input createdAt: ${moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
      );
      await this.candidateService.create({
        ...data,
        createdAt: moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      });
    } catch (error) {
      logger.error(error);
    } finally {
      return true;
    }
  }
}
