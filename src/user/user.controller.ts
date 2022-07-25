import { Controller, Get, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { User } from './dto/user.dto';
import { UserId } from './dto/userid.dto';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserIdList } from './dto/useridlist.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Redis) private redisClient: Redis,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @GrpcMethod('UserService')
  async FindOne(data: UserId): Promise<User> {
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

  @GrpcMethod('UserService')
  async FindMany(data: UserIdList): Promise<Array<User>> {
    const { listId } = data;
    const res = Array<User>();

    for (const id of listId) {
      try {
        const user: any = await this.redisClient.get(id);

        if (user) {
          res.push(JSON.parse(user));
        } else {
          const userInDb = await this.userModel.findById(id);

          if (userInDb) {
            const user = {
              id: userInDb._id,
              name: userInDb.fullname,
              email: userInDb.email,
              password: userInDb.password,
              verify: userInDb.verify,
              avatar: userInDb.avatar,
            };
            this.redisClient.setex(user.id, 10800, JSON.stringify(user));
            res.push(user);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log(res);
    return res;
  }
}
