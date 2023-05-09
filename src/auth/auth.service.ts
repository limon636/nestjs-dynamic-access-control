import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UserService, 
    private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    const { password } = user;

    const isMatch = await bcrypt.compare(pass, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id,username: user.username, role: user.role, is_super_admin: user.is_super_admin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
