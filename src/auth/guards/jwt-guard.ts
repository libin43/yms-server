import { AuthenticationError } from '@nestjs/apollo';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access-token') {
    constructor( private reflector: Reflector) {
        console.log('inside ACCESSGUARD');
        super();
    }

    getRequest(context: ExecutionContext) {        
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req;
    }

    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //     const isPublic = this.reflector.getAllAndOverride('isPublic',[
    //         context.getHandler(),
    //         context.getClass()
    //     ]);
    //     if(isPublic) {
    //         return true;
    //     }
    //     return super.canActivate(context)
    // }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        // console.log(err, user, info,context,status,'caught in hahahahah');
        console.log(info, err);
        
        if(info instanceof TokenExpiredError  ){
            console.log(info);
            const expiredAt = info.expiredAt; // Extract the expiredAt property
            // You can handle the expiration timestamp as needed
            throw new UnauthorizedException(`Token has expired at ${expiredAt}`);
        }
        else if(info instanceof JsonWebTokenError) {
            throw new AuthenticationError(`Invalid token`);
        }
        if (err || !user) {
            // Customize the error message based on your requirements
            const message = err && err.message ? err.message : 'Unauthorized';
            // throw new UnauthorizedException(message);
        }
        return user;
    }
}