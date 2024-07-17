import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const logger = new Logger('Candidates');

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCandidateInput: CreateCandidateInput) {
    logger.log('createCandidateInput ' + JSON.stringify(createCandidateInput));

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

    let subWrites = [];

    if (createCandidateInput.education) {
      subWrites.push(
        this.prisma.education.createMany({
          data: createCandidateInput.education.map((item) => {
            return {
              candidateId: candidate.id,
              ...item,
            };
          }),
        }),
      );
    }

    if (createCandidateInput.experience) {
      subWrites.push(
        this.prisma.experience.createMany({
          data: createCandidateInput.experience.map((item) => {
            return {
              candidateId: candidate.id,
              ...item,
            };
          }),
        }),
      );
    }

    await Promise.all(subWrites);

    return candidate;
  }

  async findAll(offset: number, limit: number) {
    return this.prisma.candidate.findMany({
      skip: offset,
      take: limit,
    });
  }

  async count() {
    return { count: await this.prisma.candidate.count() };
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateInput: UpdateCandidateInput) {}

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
