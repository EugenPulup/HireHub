import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CampaignModule,
    CandidatesModule,
    ClientsModule.register([
      {
        name: 'FINDER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'be-gateway',
            brokers: [process.env.KAFKA_URI],
          },
          consumer: {
            groupId: 'finder-group',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: './schema.gql',
      include: [CampaignModule, CandidatesModule],
    }),
    PrometheusModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
