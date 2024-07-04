import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';
import { FinderConsumer } from './finder.processor';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'finder_jobs',
    }),
    PrometheusModule.register(),
  ],
  controllers: [FinderController],
  providers: [FinderService, FinderConsumer],
})
export class FinderModule {}
