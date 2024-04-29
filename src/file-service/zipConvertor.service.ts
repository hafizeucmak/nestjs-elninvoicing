import { Injectable } from '@nestjs/common';
import * as JSZip from 'jszip';
import * as crypto from 'crypto';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';


@Injectable()
export class ZipConvertorService {
    async generateZipFile(uniqueId: string): Promise<string> {
        try {

            const fileName = uniqueId + ".xml";
            const xmlBucketNme = "xml-invoice";
            const xmlData = await this.downloadFromS3(xmlBucketNme, fileName);
            const zip = new JSZip();
            zip.file(uniqueId, xmlData);
            const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
            await this.uploadZipToS32(zipFile, uniqueId, "zip-invoice");
            return uniqueId;

        } catch (error) {
            throw new Error('Failed to generate zip and hash: ' + error.message);
        }
    }

    private md5 = crypto.createHash('md5');

    public getMD5Hash(filebyteArray: Buffer): string {
        if (filebyteArray != null && filebyteArray.length > 0) {
            const hashData = this.md5.update(filebyteArray).digest('hex');
            return hashData;
        }
    }

    private async calculateMD5(data: Buffer): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const hash = crypto.createHash('md5');
            hash.update(data);
            resolve(hash.digest('hex'));
        });
    }

    async downloadFromS3(bucketName: string, uniqueId: any): Promise<any> {
        try {
            const s3Client = new S3Client({
                region: process.env.S3CLIENT_REGION,
                credentials: {
                    accessKeyId: process.env.S3CLIENT_ACCESSKEY,
                    secretAccessKey: process.env.S3CLIENT_SECRETKEY,
                },
            });

            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: uniqueId,
            });

            const response = await s3Client.send(command);

            return response.Body as Readable;
        } catch (error) {
            throw new Error(`Failed to download file from S3: ${error.message}`);
        }
    }

    public async uploadZipToS3(data: any, uniqueId: string, bucketName: string) {

        const s3Client = new S3Client({
            region: process.env.S3CLIENT_REGION,
            credentials: {
                accessKeyId: process.env.S3CLIENT_ACCESSKEY,
                secretAccessKey: process.env.S3CLIENT_SECRETKEY,
            },
        });

        const s3BucketName = bucketName;

        try {
            let bodyData;
            if (typeof data === 'string') {
                bodyData = data;
            } else if (Buffer.isBuffer(data)) {
                bodyData = data.toString('binary');
            } else {
                throw new Error('Data must be of type string or Buffer');
            }

            const command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key: uniqueId,
                Body: bodyData,
                ContentType: 'application/zip'
            });

            await s3Client.send(command);

        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
        }
    }

    public async uploadZipToS32(zipFileBuffer: Buffer, fileName: string, bucketName: string) {
        const s3 = new AWS.S3();
        const params = {
            Bucket: bucketName,
            Key: `${fileName}.zip`, // ensure the file extension is correct
            Body: zipFileBuffer,
            ContentType: 'application/zip', // correct MIME type for zip files
            ContentEncoding: 'binary', // ensure the encoding is set to binary
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully at', data.Location);
            return data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}
