import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';

const logger = new Logger('Candidates');

@Injectable()
export class CandidatesService {
  create(createCandidateInput: CreateCandidateInput) {
    logger.log('Created Candidate: ' + createCandidateInput.campaign);
    return 'This action adds a new candidate';
  }

  findAll() {
    return `This action returns all candidates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateInput: UpdateCandidateInput) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
