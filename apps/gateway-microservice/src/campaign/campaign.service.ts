import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CampaignService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCampaignInput: CreateCampaignInput) {
    return this.prisma.campaign.create({
      data: createCampaignInput,
    });
  }

  findAll() {
    return `This action returns all campaign`;
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

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
