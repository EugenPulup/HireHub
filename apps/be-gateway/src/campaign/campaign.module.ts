import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'FINDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'campaign:search',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [CampaignResolver, CampaignService],
})
export class CampaignModule {}
