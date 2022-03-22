import {Connection} from 'mongoose';
import {MetadataSchema} from './schemas/metadata.schema';

export const metadataProviders = [
    {
        provide: 'METADATA_MODEL',
        useFactory: (connection: Connection) => connection.model('Metadata', MetadataSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
