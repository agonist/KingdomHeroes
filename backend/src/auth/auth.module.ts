import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";
import {Web3Strategy} from "./web3.strategy";

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '7d'},
    }),],
    providers: [AuthService, JwtStrategy, Web3Strategy],
    exports: [AuthService],

})
export class AuthModule {
}
