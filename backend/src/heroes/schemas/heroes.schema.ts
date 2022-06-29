import mongoose from "mongoose";


export const HeroesSchema = new mongoose.Schema({
    id: Number,
    bc: [
        {lastUsed: Number}
    ]
})
