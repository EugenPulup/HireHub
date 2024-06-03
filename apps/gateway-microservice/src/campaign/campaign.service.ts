import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CampaignService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCampaignInput: CreateCampaignInput) {
    return this.prisma.campaign.create({
      data: createCampaignInput,
    });
  }

  findAll(offset = 0 as number, limit = 10 as number) {
    return this.prisma.campaign.findMany({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.prisma.campaign.findFirst({
      where: { id },
    });
  }

  update(id: string, updateCampaignInput: UpdateCampaignInput) {
    return this.prisma.campaign.update({
      where: { id },
      data: updateCampaignInput,
    });
  }

  remove(id: string) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
