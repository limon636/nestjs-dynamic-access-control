
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { ResourceService } from 'src/resource/resource.service';
import { PolicyService } from 'src/policy/policy.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService, private reflector: Reflector, private readonly resourceService: ResourceService, private readonly policyService: PolicyService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
      
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        let haspermission = false;
        try {
            const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
            );

            request['user'] = payload;
            if(!payload.is_super_admin){
                haspermission = await this.hasPermission(request, payload.role);
            } else {
                haspermission = true;
            }
        } catch {
            throw new UnauthorizedException();
        }
        if(!haspermission){
            throw new UnauthorizedException('Do not have enough permission');   
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    private async hasPermission(request, role){
        const resource = await this.splitUrl(request);
        const res = await this.resourceService.findResource(resource);
        if(res){
            const policy = await this.policyService.findPolicy(role.id, res.id);
            if(policy) return true;
        }
        return false;
    }

    private splitUrl(request) {
        const split = request.url.split('/');
        const policy = {type: request.method};
        if(split.length > 1){
            policy['controller'] = split[1];
            if(isNaN(split[2])){
                policy['method'] = split[2];
            }
        }
        return policy;
    }
  }
  