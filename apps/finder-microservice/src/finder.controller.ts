import { Controller, Get, Inject } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { FinderService } from './finder.service';

@Controller()
export class FinderController {
  constructor(private readonly finderService: FinderService) {}

  @Get()
  getHello(): string {
    return this.finderService.getHello();
  }

  @MessagePattern('finder_job')
  async job(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 1000));
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.finderService.processJob(data);

    channel.ack(originalMsg);

    return true;
  }
}
