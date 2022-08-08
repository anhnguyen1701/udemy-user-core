import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user',
          type: 'direct',
        },
      ],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5673',
    }),
  ],
})
export class RabbitmqModule {}
