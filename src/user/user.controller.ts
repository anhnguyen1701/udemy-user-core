import { Controller, Get, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { User } from './dto/user.dto';
import { UserId } from './dto/userid.dto';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Redis) private redisClient: Redis,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @GrpcMethod('UserService')
  async FindOne(data: UserId): Promise<User> {
    // save user to cache at first time query, expire 3hours

    // return {
    //   id: 'error',
    //   name: 'error',
    //   email: 'error',
    //   password: 'error',
    //   verify: true,
    //   avatar: 'error',
    // };

    const { id } = data;
    const result: any = await this.redisClient.get(id);
    if (result) {
      return JSON.parse(result);
    } else {
      const userInDb = await this.userModel.findById(id);
      const user = {
        id: userInDb._id,
        name: userInDb.fullname,
        email: userInDb.email,
        password: userInDb.password,
        verify: userInDb.verify,
        avatar: userInDb.avatar,
      };
      this.redisClient.setex(user.id, 10800, JSON.stringify(user));
      return user;
    }
  }
}
