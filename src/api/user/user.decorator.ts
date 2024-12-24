import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get current authorized user stored as method parameter
 * @type {(...dataOrPipes: Type<PipeTransform> | PipeTransform | unknown[]) => ParameterDecorator}
 */
export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user || null;
  },
);
