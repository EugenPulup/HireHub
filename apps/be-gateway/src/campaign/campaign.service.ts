import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { ListCampaignInput } from './dto/list-campaign.input';
import { PrismaService } from '@hirehub/prisma';
import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Logger } from '@nestjs/common';

const logger = new Logger('Finder');
@Injectable()
export class CampaignService {
  constructor(
    @Inject('FINDER_SERVICE') private messageBroker: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async create(createCampaignInput: CreateCampaignInput) {
    const campaign = await this.prisma.campaign.create({
      data: createCampaignInput,
    });

    this.messageBroker.emit('campaign_search', campaign).subscribe(logger.log);

    return campaign;
  }

  findAll({
    filterValue,
    filterKey,
    sortValue,
    sortKey,
    offset,
    limit,
  }: ListCampaignInput) {
    return this.prisma.campaign.findMany({
      skip: offset,
      take: limit,
      ...(filterKey && { where: { [filterKey]: filterValue } }),
      ...(sortKey && { orderBy: { [sortKey]: sortValue } }),
    });
  }

  count() {
    return this.prisma.campaign.count();
  }

  async findOne(id: string) {
    return this.prisma.campaign.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateCampaignInput: UpdateCampaignInput) {
    return this.prisma.campaign.update({
      where: { id },
      data: updateCampaignInput,
    });
  }

  async remove(ids: string[]) {
    return this.prisma.campaign.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
