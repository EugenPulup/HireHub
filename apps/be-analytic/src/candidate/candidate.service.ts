import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';

@Injectable()
export class CandidateService {
  create(createCandidateInput: CreateCandidateInput) {
    return 'This action adds a new candidate';
  }

  findAll() {
    return `This action returns all candidate`;
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
