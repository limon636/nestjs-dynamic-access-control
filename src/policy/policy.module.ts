import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { Policy } from './entities/policy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
  controllers: [PolicyController],
  providers: [PolicyService],
  exports: [PolicyService]
})
export class PolicyModule {}
