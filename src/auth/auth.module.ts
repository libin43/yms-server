import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { YardModule } from 'src/yard/yard.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    YardModule,
    JwtModule.register({})
  ],
  providers: [AuthService, AuthResolver, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
