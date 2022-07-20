import { Controller, Get, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import Redis from 'ioredis';
import { User } from './dto/user.dto';
import { UserId } from './dto/userid.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(Redis) private redisClient: Redis) {}

  @GrpcMethod('UserService')
  FindOne(data: UserId): User {
    console.log(data);
    this.redisClient.set('testgrpc', 'test');
    return { id: 'test', name: 'test-name' };
  }
}
