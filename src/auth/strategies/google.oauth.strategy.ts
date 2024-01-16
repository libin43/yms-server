import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback, Profile as googleProfile, Strategy as googleStrategy } from "passport-google-oauth20";

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(googleStrategy, 'google-oauth'){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/redirect",
            // scope:[]
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: googleProfile, done: VerifyCallback) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        
        return {accessToken, refreshToken, profile}
        
    }

}