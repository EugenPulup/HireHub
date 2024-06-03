import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';

@Injectable()
export class CampaignService {
  create(createCampaignInput: CreateCampaignInput) {
    return 'This action adds a new campaign';
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignInput: UpdateCampaignInput) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
