import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { ListCampaignInput } from './dto/list-campaign.input';
import { PrismaService } from '../prisma/prisma.service';
import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

import { Logger } from '@nestjs/common';

const logger = new Logger('Finder');
@Injectable()
export class CampaignService {
  constructor(
    @Inject('FINDER_SERVICE') private rabbit_client: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  async create(createCampaignInput: CreateCampaignInput) {
    const campaign = await this.prisma.campaign.create({
      data: createCampaignInput,
    });

    const record = new RmqRecordBuilder(campaign)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();

    this.rabbit_client.send('campaign:search', record).subscribe(logger.log);

    return campaign;
  }

  async findAll({
    filterValue,
    filterKey,
    sortValue,
    sortKey,
    offset,
    limit,
  }: ListCampaignInput) {
    return await this.prisma.campaign.findMany({
      skip: offset,
      take: limit,
      ...(filterKey && { where: { [filterKey]: filterValue } }),
      ...(sortKey && { orderBy: { [sortKey]: sortValue } }),
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
