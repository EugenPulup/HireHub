import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'FINDER_SERVICE',
        useFactory: (configService: ConfigService) => {
          console.log(configService.get('KAFKA_URI'));
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
  providers: [CampaignResolver, CampaignService],
})
export class CampaignModule {}
