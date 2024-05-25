import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FinderModule } from './finder.module';
import { Logger } from '@nestjs/common';
import { AppClusterService } from './cluster.service';

const logger = new Logger('Finder');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FinderModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'finder_jobs',
        noAck: false,
        prefetchCount: 1,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  logger.log('Microservice is listening');

  await app.listen();
}
bootstrap();

// AppClusterService.clusterize(bootstrap);
