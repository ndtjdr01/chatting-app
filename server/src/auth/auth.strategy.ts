import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
            ignoreExpiration: true,
        })
    }
    async validate(payload:any){ 
        return {username: payload.username,userId: payload.userId}
    }
}