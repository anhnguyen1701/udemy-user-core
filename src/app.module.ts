import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    UserModule,
    RedisModule.forRoot(process.env.REDIS_URI),
    MongoModule.forRoot(process.env.MONGO_URI, {
      ignoreUndefined: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      minPoolSize: 5,
    }),
  ],
})
export class AppModule {}
