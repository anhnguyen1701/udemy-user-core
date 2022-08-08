import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UpdateUserConsumerModule } from './update-user-consumer/update-user-consumer.module';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user',
          type: 'direct',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5673',
      connectionInitOptions: { wait: true },
    }),
    UpdateUserConsumerModule,
    //some event Module ....
  ],
})
export class EventModule {}
