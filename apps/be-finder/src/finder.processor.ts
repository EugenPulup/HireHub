import { WorkuaScrapper } from './scrapper/workua.scrapper';
import { AnthropicParser } from './parser/anthropic.parser';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import puppeteer from 'puppeteer';
import { schema } from './schemas/candidate.schema';

const logger = new Logger('FinderService');

@Processor('campaign:search', { concurrency: 5 })
export class FinderConsumer extends WorkerHost {
  constructor(@Inject('CANDIDATE_QUEUE') private kafka_client: ClientKafka) {
    super();
  }

  async process(job: Job<any, any, string>) {
    try {
      await job.updateProgress(0);

      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

      const scrapper = new WorkuaScrapper(browser);

      const parser = new AnthropicParser('claude-3-haiku-20240307', schema);

      for await (const result of scrapper.scrapByKeyword(job.data.keyword)) {
        try {
          const candidate = await parser.parse(result);

          this.kafka_client
            .emit('candidate_action_save', {
              ...candidate,
              campaignId: job.data.id,
            })
            .subscribe(logger.log);

          logger.log('Send to Queue');
        } catch (error) {
          logger.log(`ERROR: ${error}`);
        } finally {
          continue;
        }
      }

      await job.updateProgress(100);

      await browser.close();

      return true;
    } catch (error) {
      logger.error(`Error in Processor: ${error}`);
      job.moveToFailed(error, job.token);
    }
  }
}
