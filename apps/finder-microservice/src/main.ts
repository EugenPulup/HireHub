import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FINDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'finder_jobs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [FinderController],
  providers: [FinderService],
})
export class AppModule {}
