import { AllowedRoles } from '@/auth/role.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    const user = gqlContext['user'];
    if (!user) return false;
    if (!roles || !roles.length || roles.includes('Any')) return true;
    return roles.includes(user.role);
  }
}
