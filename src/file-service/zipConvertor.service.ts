import { Injectable } from '@nestjs/common';
import * as JSZip from 'jszip';
import * as crypto from 'crypto';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ZipConvertorService {
    async generateZipAndHash(fileUrl: string): Promise<{ zipFile: Buffer, hash: string, uniqueId : uuidv4 }> {
        try {
            console.log(fileUrl);
           // const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
            const xmlData = await this.downloadFromS3(fileUrl);

            const zip = new JSZip();
            const uniqueId = uuidv4();
            zip.file(uniqueId, xmlData);

            const zipFile = await zip.generateAsync({ type: 'nodebuffer' });

            const hash = await this.calculateMD5(zipFile);

            return { zipFile, hash, uniqueId };
        } catch (error) {
            throw new Error('Failed to generate zip and hash: ' + error.message);
        }
    }

    private async calculateMD5(data: Buffer): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const hash = crypto.createHash('md5');
            hash.update(data);
            resolve(hash.digest('hex'));
        });
    }

    async downloadFromS3(uniqueId: any): Promise<any> {
        try {
            const bucketName = "xml-invoice";
            const objectKey = bucketName + '-' + uniqueId;
            const s3Client = new S3Client({
                region: process.env.S3CLIENT_REGION,
                credentials: {
                    accessKeyId: process.env.S3CLIENT_ACCESSKEY,
                    secretAccessKey: process.env.S3CLIENT_SECRETKEY,
                },
            });

            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
            });

            const response = await s3Client.send(command);

            return response.Body as Readable;
        } catch (error) {
            throw new Error(`Failed to download file from S3: ${error.message}`);
        }
    }
}
