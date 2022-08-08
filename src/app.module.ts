import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { MongoModule } from './mongo/mongo.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { EventModule } from './event/event.module';
import * as mongoose from 'mongoose';

mongoose.set('debug', true);

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
    EventModule,
    // RabbitmqModule,
  ],
})
export class AppModule {}
