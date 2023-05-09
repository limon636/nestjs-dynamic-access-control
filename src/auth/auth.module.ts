import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ResourceModule } from 'src/resource/resource.module';
import { PolicyModule } from 'src/policy/policy.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    UserModule, ResourceModule, PolicyModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
