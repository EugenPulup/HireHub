import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import ScrapperFactory from './scenarios/workUa.scenario';

import { Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import fs from 'fs'; // Import the 'fs' module

const logger = new Logger('FinderService');

@Processor('finder_jobs')
export class FinderConsumer {
  @Process({ name: 'scrap', concurrency: 1 })
  async transcode(job: Job<{ name: string }>) {
    try {
      const browser = await puppeteer.launch();

      const scrapper = new ScrapperFactory(browser, { name: job.data.name });

      const response = await scrapper.parseWithAI();

      await browser.close();

      logger.log('Job done:', JSON.stringify(response));

      return response;
    } catch (error) {
      logger.error(error);
    }
  }
}
