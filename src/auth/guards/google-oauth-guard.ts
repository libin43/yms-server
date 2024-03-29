import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()

export class GoogleOAuthGuard extends AuthGuard('google-oauth'){
    constructor(){
        super()
    }

    getRequest(context: ExecutionContext) {        
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req;
    }
}