import * as AWS from 'aws-sdk';
import { WasabiRepository } from '../../domain/repositories/wasabi_repository';

export class WasabiRepositoryImpl implements WasabiRepository {
    generatePresignedUrl(bucket: string, key: string, expires: number): Promise<String> {
        AWS.config.update({
            accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
            secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY,
            region: 'eu-central-2', // Frankfurt
            signatureVersion: 'v4'
        });

        const s3 = new AWS.S3({
            endpoint: 's3.eu-central-2.wasabisys.com', // Wasabi endpoint
            s3ForcePathStyle: true,
        });

        return new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', {
                Bucket: bucket,
                Key: key,
                Expires: expires
            }, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });
    }
}
