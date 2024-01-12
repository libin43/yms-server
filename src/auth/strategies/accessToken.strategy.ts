import { AuthenticationError } from '@nestjs/apollo';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        })

        console.log('INSIDE AccessTokenStrategy');
        
    }

    async validate(payload: any) {
        console.log(payload,'in validate');

        const expirationTime = payload.exp;

        if (Date.now() >= expirationTime * 1000) {
            // Token has expired
            throw new AuthenticationError('Token has expired');
        }
        
        return payload;
    }
}