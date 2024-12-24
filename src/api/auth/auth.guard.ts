import {
  Injectable,
  CanActivate,
  ExecutionContext,
  // Logger,
  SetMetadata,
  UnauthorizedException,
  // UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../core/policies';
import { UserDto } from '../user/dto/user.dto';
// import { ValueOf } from '../../types';
// import { ROLES } from '../core/policies';

export const POLICY_KEY = 'policy';

// export const Policies = Reflector.createDecorator<Array<keyof POLICY>>();

export const Policies =
  (policies: Role | Array<Role>) => (proto, propName, descriptor) => {
    // UseGuards();
    SetMetadata(POLICY_KEY, policies)(proto, propName, descriptor);
  };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies: Role[] = this.reflector.get(
      POLICY_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user: UserDto | undefined = req.user;

    if (user) {
      if (user.is_admin) {
        return true;
      }

      if (policies) {
        for (const role of policies) {
          // even if a single policy has been found - method allowed
          if (user.policies?.[role.domain] === role.key) return true;
        }
      } else {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}
