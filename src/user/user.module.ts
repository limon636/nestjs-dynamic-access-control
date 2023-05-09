import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { IsUniqueRule } from './IsUniqueRule';

@Module({
  imports:[TypeOrmModule.forFeature([User, Role, Policy, Resource])],
  controllers: [UserController],
  providers: [UserService, IsUniqueRule],
  exports: [UserService]
})
export class UserModule {}
