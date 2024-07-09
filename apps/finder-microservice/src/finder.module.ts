import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';
import { FinderConsumer } from './finder.processor';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'CANDIDATE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'candidate:save',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'campaign:search',
    }),
    PrometheusModule.register(),
  ],
  controllers: [FinderController],
  providers: [FinderService, FinderConsumer],
})
export class FinderModule {}
