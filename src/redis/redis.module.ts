import { DynamicModule, Module, Provider } from '@nestjs/common';
import Redis from 'ioredis';

@Module({})
export class RedisModule {
  public static forRoot(url: string): DynamicModule {
    const redisClientProvider: Provider<Redis> = {
      provide: Redis,
      useValue: new Redis(url),
    };

    return {
      global: true,
      module: RedisModule,
      providers: [redisClientProvider],
      exports: [redisClientProvider],
    };
  }
}
