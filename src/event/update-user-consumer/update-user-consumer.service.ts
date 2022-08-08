import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage, Channel } from 'amqplib';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/dto/user.dto';
import Redis from 'ioredis';

export class UpdateUserConsumerService {
  constructor(@Inject(Redis) private redisClient: Redis) {}

  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'update',
    queue: 'user-core',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.error(error);
      channel.reject(msg, false);
    },
  })
  public async invalidUpdateUser(data: any) {
    const { user } = data;

    console.log(user);

    this.redisClient.setex(user._id, 10800, JSON.stringify(user));
  }
}
