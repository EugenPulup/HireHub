import ScrapperFactory from './scenarios/workUa.scenario';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import fs from 'fs'; // Import the 'fs' module

const logger = new Logger('FinderService');

@Processor('finder_jobs', { concurrency: 5 })
export class FinderConsumer extends WorkerHost {
  async process(job: Job<any, any, string>) {
    try {
      await job.updateProgress(0);
      await new Promise((r) => setTimeout(r, 5000));
      await job.updateProgress(100);
      // const browser = await puppeteer.launch();

      // const scrapper = new ScrapperFactory(browser, { name: job.data.name });

      // const response = await scrapper.parseWithAI();

      // await browser.close();

      logger.log('Job done:', job.data.name);

      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}
