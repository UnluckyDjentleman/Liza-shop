import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      console.log(data);
      console.log(request.user);
      try {
        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
          throw new UnauthorizedException("You're not authorized");
        }
        if (data) {
          return request.user[data];
        }
        return request.user;
      } catch (err) {
        throw new UnauthorizedException("You're not authorized");
      }
    },
  );