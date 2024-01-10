import { Injectable, UnauthorizedException } from '@nestjs/common';
import { YardService } from 'src/yard/yard.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly yardService: YardService,
        private readonly jwtService: JwtService,
        ) {}

    // async generateTokens(payload): Promise<{ access_token: string, refresh_token: string}> {
    //     const access_token = this.jwtService.sign({ payload }), { strategy: 'jwt-access'};
    //     const refresh_token = this.jwtService.sign({ payload }, { strategy: 'jwt-refresh' });
    //     return {access_token, refresh_token}
    // }

    async yardLogin (email: string, password: string): Promise<any> {
        const user = await this.yardService.verifyUser(email, password)
        if(!user?.user) throw new UnauthorizedException();
        const {id, yard_name, role} = user.user
        const payload = {id, yard_name, role}
        const {refreshToken, accessToken} = await this.generateTokens(payload)
        
        return {
            id,
            yard_name,
            accessToken,
            refreshToken,
            role,
            
        }
    }

    //helper function
    async generateTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    payload
                },
                {
                    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                    expiresIn: '1m',
                }
            ),
            this.jwtService.signAsync(
                {
                    payload
                },
                {
                    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                    expiresIn: '5m',
                }
            )
        ])

        return {accessToken, refreshToken}
    }
}