import { Controller, Get, Inject } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { FinderService } from './finder.service';
import { Logger } from '@nestjs/common';

const logger = new Logger('FinderService');

@Controller('/finder')
export class FinderController {
  constructor(private readonly finderService: FinderService) {}

  @Get()
  getHello(): string {
    return this.finderService.getHello();
  }

  @Get('/metrics')
  async getMetrics() {
    return this.finderService.getMetrics();
  }

  @MessagePattern('finder_job', Transport.RMQ)
  async job(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    logger.log('Received Job!');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.finderService.processJob(data);

    channel.ack(originalMsg);

    return true;
  }
}
