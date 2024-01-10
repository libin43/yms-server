import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data,'cookie called');
    
    const gqlContext = GqlExecutionContext.create(ctx);
    const { req } = gqlContext.getContext();
    return data ? req.cookies?.[data] : req.cookies;
  },
);