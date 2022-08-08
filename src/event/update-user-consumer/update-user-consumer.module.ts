import { Module } from '@nestjs/common';
import { UpdateUserConsumerService } from './update-user-consumer.service';

@Module({
  providers: [UpdateUserConsumerService]
})
export class UpdateUserConsumerModule {}
