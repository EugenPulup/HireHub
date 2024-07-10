import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
// import { CandidatesResolver } from './candidates.resolver';
import { CandidatesConsumer } from './candidates.consumer';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
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
  ],
  providers: [CandidatesService],
  controllers: [CandidatesConsumer],
})
export class CandidatesModule {}
