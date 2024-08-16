import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FinderModule } from './finder.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('Finder');

async function bootstrap() {
  const app = await NestFactory.create(FinderModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'be-finder',
        brokers: [process.env.KAFKA_URI],
      },
      consumer: {
        groupId: 'finder-group',
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap();
