import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateResolver } from './candidate.resolver';

@Module({
  providers: [CandidateResolver, CandidateService],
})
export class CandidateModule {}
