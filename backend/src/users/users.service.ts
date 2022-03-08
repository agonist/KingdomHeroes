import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';


export interface User extends Document {
    readonly address: string;
    readonly nonce: string;
}

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
    ) {
    }

    async generateNewNonce(address: string) {
        await this.userModel.updateOne({address: address}, {nonce: Math.floor(Math.random() * 1000000).toString()}).exec()
    }

    async create(address: string, nonce: string): Promise<User> {
        return this.userModel.create({address: address, nonce: nonce})
    }

    async findOne(address: string): Promise<User | undefined> {

        return this.userModel.findOne({'address': address}).exec()
    }
}
