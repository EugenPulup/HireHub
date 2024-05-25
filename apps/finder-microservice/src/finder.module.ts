import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';
import { FinderConsumer } from './finder.processor';
import { join } from 'path';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        keyPrefix: 'finder',
      },
    }),
    BullModule.registerQueue({
      name: 'finder_jobs',
    }),
  ],
  controllers: [FinderController],
  providers: [FinderService, FinderConsumer],
})
export class FinderModule {}
