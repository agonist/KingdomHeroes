import {Controller, Get, Logger, Param, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {UsersService} from "./users/users.service";
import {AuthGuard} from "@nestjs/passport";
import {Web3Strategy} from "./auth/web3.strategy";

@Controller()
export class AppController {

    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Get("auth/:address/nonce")
    async nonce(@Request() req, @Param() params) {
        const user = await this.userService.findOne(params.address)

        if (user) {
            return {nonce: user.nonce}
        }

        const generatedNonce = Math.floor(Math.random() * 1000000).toString();

        return await this.userService.create(params.address, generatedNonce)
    }

    @UseGuards(AuthGuard(Web3Strategy.key))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
