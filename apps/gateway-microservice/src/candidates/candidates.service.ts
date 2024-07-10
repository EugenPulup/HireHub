import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

const logger = new Logger('Candidates');

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCandidateInput: CreateCandidateInput) {
    logger.log('createCandidateInput' + createCandidateInput);

    const candidate = await this.prisma.candidate.create({
      data: {
        name: createCandidateInput.name,
        age: createCandidateInput.age,
        typeOfWork: createCandidateInput.typeOfWork,
        position: createCandidateInput.position,
        salaryExpectation: createCandidateInput.salaryExpectation,
        skills: createCandidateInput.skills,
        location: createCandidateInput.location,
        languages: createCandidateInput.languages,

        campaign: {
          connect: {
            id: createCandidateInput.campaignId,
          },
        },
      },
    });

    return candidate;
  }

  findAll() {}

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
