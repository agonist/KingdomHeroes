import {Controller, Get, Logger, Param, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {Web3Strategy} from "./web3.strategy";
    
@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Get(":address/nonce")
    async nonce(@Request() req, @Param() params) {
        const user = await this.userService.findOne(params.address)

        if (user) {
            return {nonce: user.nonce}
        }

        const generatedNonce = Math.floor(Math.random() * 1000000).toString();

        return await this.userService.create(params.address, generatedNonce)
    }

    @UseGuards(AuthGuard(Web3Strategy.key))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
