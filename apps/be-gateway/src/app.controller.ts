import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import {
  RmqRecordBuilder,
  ClientProxy,
  ClientKafka,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

const logger = new Logger('Finder');

@Controller()
export class AppController {
  constructor(
    @Inject('FINDER_SERVICE') private kafka_client: ClientKafka,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Post('job')
  async job(
    @Body() job: { name: string; providers: [string] },
  ): Promise<boolean> {
    // const record = new RmqRecordBuilder(job)
    //   .setOptions({
    //     headers: {
    //       ['x-version']: '1.0.0',
    //     },
    //     priority: 3,
    //   })
    //   .build();

    // this.kafka_client.send('campaign:search', record).subscribe(logger.log);

    this.kafka_client.emit('campaign:search', job);

    console.log(job.name + ' job sent');

    return true;
  }

  @Post('job/bulk')
  async jobBulk(@Body() job: { count: number }): Promise<boolean> {
    const record = new RmqRecordBuilder(job)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();

    for (let i = 0; i < job.count; i++) {
      this.kafka_client
        .send('campaign:search', {
          name: 'job' + i,
        })
        .subscribe(logger.log);
    }

    console.log(job.count + ' jobs sent');

    return true;
  }
}
