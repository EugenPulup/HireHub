import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateResolver } from './candidate.resolver';
import { CandidateConsumer } from './candidate.consumer';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'ANALYTIC_QUEUE',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'be-gateway',
                brokers: [configService.get('KAFKA_URI')],
              },
              consumer: {
                groupId: 'analytic-group',
                allowAutoTopicCreation: true,
              },
            },
          };
        },
      },
    ]),
    ClickHouseModule.register([
      {
        name: 'ANALYTIC_DB',
        host: process.env.CLICKHOUSE_HOST,
        password: process.env.CLICKHOUSE_PASSWORD,
        username: process.env.CLICKHOUSE_USER,
        database: process.env.CLICKHOUSE_DB,
      },
    ]),
  ],
  providers: [CandidateResolver, CandidateService],
  controllers: [CandidateConsumer],
})
export class CandidateModule {}
