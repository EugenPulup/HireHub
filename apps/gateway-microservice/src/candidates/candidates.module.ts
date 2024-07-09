import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesResolver } from './candidates.resolver';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
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
  providers: [CandidatesResolver, CandidatesService],
})
export class CandidatesModule {}
