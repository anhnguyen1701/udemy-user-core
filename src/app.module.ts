import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [UserModule, RedisModule.forRoot(process.env.REDIS_URI)],
})
export class AppModule {}
