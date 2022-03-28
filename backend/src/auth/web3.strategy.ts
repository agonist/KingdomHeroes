import {Strategy} from 'passport-custom';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Injectable()
export class Web3Strategy extends PassportStrategy(Strategy, "web3") {
    private logger = new Logger();

    static key = "web3"

    constructor(private authService: AuthService) {
        super();
    }

    async validate(req: Request): Promise<any> {
        const user = await this.authService.validateUser(req.body['address'], req.body['signature']);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
