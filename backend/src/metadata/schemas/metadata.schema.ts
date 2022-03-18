import * as mongoose from 'mongoose';

export const MetadataSchema = new mongoose.Schema({
    name: String,
    description: String,
    id: Number,
    image: String,
    attributes: [
        {
            trait_type: String,
            value: String
        }
    ],
    statsAttributes: [
        {
            display_type: String,
            trait_type: String,
            value: Number
        }
    ]
});
