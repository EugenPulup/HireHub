import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { Logger } from '@nestjs/common';

const logger = new Logger('FinderService');

@Injectable()
export class FinderService {
  constructor(@InjectQueue('finder_jobs') private finderQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processJob(data: object) {
    await this.finderQueue.add('scrap', data);
  }
}
