import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log(roles);
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRole = await this.authService.getUserRole(user.id);

    return roles.includes(userRole);
  }
}