import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesResolver } from './candidates.resolver';
import { CandidatesConsumer } from './candidates.consumer';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'CANDIDATE_QUEUE',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'be-gateway',
                brokers: [configService.get('KAFKA_URI')],
              },
              consumer: {
                groupId: 'be-finder',
                allowAutoTopicCreation: true,
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [CandidatesResolver, CandidatesService],
  controllers: [CandidatesConsumer],
})
export class CandidatesModule {}
