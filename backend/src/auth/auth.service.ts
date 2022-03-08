import {Injectable, Logger} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {recoverPersonalSignature} from "@metamask/eth-sig-util";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUser(address: string, signature: string): Promise<any> {
        const user = await this.usersService.findOne(address);

        if (user) {
            const currentNonce = user.nonce
            const recoveredAddress = recoverPersonalSignature({
                data: `0x${toHex(currentNonce)}`,
                signature: signature,
            });

            if (user.address.toLowerCase() == recoveredAddress.toLowerCase()) {
                await this.usersService.generateNewNonce(address)

                const {...result} = user;
                return result;
            }

        }
        return null;
    }

    async login(user: any) {
        const payload = {address: user.address};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

const toHex = (stringToConvert: string) =>
    stringToConvert
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
