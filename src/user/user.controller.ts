import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './dto/user.dto';
import { UserId } from './dto/userid.dto';

@Controller('user')
export class UserController {
  @GrpcMethod('UserService')
  FindOne(data: UserId): User {
    console.log(data);
    return { id: 'test', name: 'test-name' };
  }
}
