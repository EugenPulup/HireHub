import { WorkuaScrapper } from './scrapper/workua.scrapper';
import { OllamaParser } from './parser/ollama.parser';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import puppeteer from 'puppeteer';

const logger = new Logger('FinderService');

@Processor('campaign:search', { concurrency: 5 })
export class FinderConsumer extends WorkerHost {
  constructor(@Inject('CANDIDATE_QUEUE') private rabbit_client: ClientProxy) {
    super();
  }
  async process(job: Job<any, any, string>) {
    try {
      await job.updateProgress(0);

      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

      const scrapper = new WorkuaScrapper(browser);

      const parser = new OllamaParser('mistrallite');

      for await (const result of scrapper.scrapByKeyword(job.data.keyword)) {
        const candidate = await parser.parse(result);

        const record = new RmqRecordBuilder({
          // ...candidate,
          campaign: job.data.id,
        })
          .setOptions({
            headers: {
              ['x-version']: '1.0.0',
            },
            priority: 3,
          })
          .build();

        this.rabbit_client.send('candidate:save', record);

        logger.log('Send to RAbbitMQ ' + record);
      }

      await job.updateProgress(100);

      await browser.close();

      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}
