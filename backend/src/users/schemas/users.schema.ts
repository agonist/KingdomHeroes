import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    address: String,
    nonce: String,
    team: [],
});
