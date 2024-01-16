import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Cookies } from 'src/common/decorators/cookie.decorator';
import { response } from 'express';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation('login')
    async login(

        @Context() { res },
        @Args('input') data,
        // @Cookies() cookies: any, // Use the Cookies decorator here
    ) {

        console.log(data, 'data coming in auth resolver');
        const { yard_email, password } = data
        const loginRes = await this.authService.yardLogin(yard_email, password)
        const {
            id,
            yard_name,
            accessToken,
            refreshToken,
            role,
        } = loginRes
        console.log(loginRes, 'dfad');

        // Set secure HTTP-only cookie in the response
        const secureCookieOptions = {
            // httpOnly: true,
            maxAge: 60 * 60 * 60,
            secure: true, // Set to true in production
            sameSite: 'none', // Adjust according to your requirements
            // path: '/refresh-token', // Set the path according to your application's needs
        };
        console.log(refreshToken, 'refresh token');
        res.cookie('refreshToken', refreshToken, secureCookieOptions)


        return {
            yard_name,
            accessToken,
            role,
        }
    }
}
