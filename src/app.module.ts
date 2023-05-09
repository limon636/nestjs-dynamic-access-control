import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PolicyModule } from './policy/policy.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { Policy } from './policy/entities/policy.entity';
import { ResourceModule } from './resource/resource.module';
import { Resource } from './resource/entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_cbac',
      entities: [User, Auth, Role, Policy, Resource],
    }),
    UserModule,
    AuthModule,
    PolicyModule,
    RoleModule,
    ResourceModule],
    providers: [
      {
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
    ]
})
export class AppModule {}
