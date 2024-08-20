import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';
import { PrismaService } from '@hirehub/prisma';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class CandidatesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('ANALYTIC_QUEUE') private analyticQueue: ClientKafka,
  ) {}

  async create(createCandidateInput: CreateCandidateInput) {
    const candidate = await this.prisma.candidate.create({
      data: {
        name: createCandidateInput.name,
        age: createCandidateInput.age || 0,
        workTime: createCandidateInput.workTime,
        workLocation: createCandidateInput.workLocation,
        position: createCandidateInput.position,
        salary: createCandidateInput.salary || 0,
        yearsOfExperience: createCandidateInput.yearsOfExperience || 0,
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

    this.analyticQueue
      .emit('candidate_create', {
        name: candidate.name,
        age: candidate.age,
        workTime: candidate.workTime,
        workLocation: candidate.workLocation,
        position: candidate.position,
        salary: candidate.salary,
        yearsOfExperience: candidate.yearsOfExperience,
        campaignId: candidate.campaignId,
        location: candidate.location,
        createdAt: candidate.createdAt,
      })
      .subscribe();

    return candidate;
  }

  async findAll(offset: number, limit: number) {
    return this.prisma.candidate.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async count() {
    return { count: await this.prisma.candidate.count() };
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateInput: UpdateCandidateInput) {}

  remove(ids: string[]) {
    return this.prisma.campaign.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
