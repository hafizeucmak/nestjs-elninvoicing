import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IntegrationServiceClient } from 'src/integration-service/integrationService.client';
import { XmlGeneratorService } from 'src/file-service/xmlGenerator.service';
import { ZipConvertorService } from 'src/file-service/zipConvertor.service';
import { TransferFileArgs } from 'src/dtos/transferFileArgs.dto';
import * as fs from "fs";
import { Readable } from 'stream';
import * as crypto from 'crypto';
import * as archiver from 'archiver';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import path from 'path';


@Injectable()
export class ElninvoiceService {
    private readonly client: IntegrationServiceClient;
    private readonly xmlGenerator: XmlGeneratorService;
    private readonly zipConvertor: ZipConvertorService;

    constructor() {
        this.client = new IntegrationServiceClient(process.env.VERIBAN_SERVICE_URL);
        this.xmlGenerator = new XmlGeneratorService();
        this.zipConvertor = new ZipConvertorService();
    }


    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        try {
            const sessionCode = await this.client.LoginAsync(process.env.VERIBAN_USERNAME, process.env.VERIBAN_PASSWORD);

            // AWS UPLOAD METHOD
            const xmlUniqueId = await this.xmlGenerator.generateXML();
            const zipUniqueId = await this.zipConvertor.generateZipFile(xmlUniqueId);
            const fileName = zipUniqueId + ".zip";
            const zipBucketNme = "zip-invoice";
            const zipFileData = await this.downloadFromS3(zipBucketNme, fileName);
            const zipFileHash = await this.calculateMD5(zipFileData);
            const zipFileName = 'vocoInvoice.zip';

            const transferResult = await this.client.TransferSalesInvoiceFileAsync(sessionCode, {
                FileNameWithExtension: zipFileName,
                FileDataType: 'XML_INZIP', // Assuming this is the correct enum value
                BinaryData: zipFileData,
                BinaryDataHash: zipFileHash,
                CustomerAlias: 'urn:mail:defaultpk@veriban.com.tr',
                IsDirectSend: true
            });

            // LOCAL UPLOAD METHOD
            // var transferResult = await this.sendInvoice(sessionCode);

            console.log(transferResult);

        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure...
        }
    }

    
    public async sendInvoice(sessionCode: string) {
        try {
            const xmlFilePath = 'C:/Users/hafiz/OneDrive/Desktop/E-Fatura Entegrasyon Test/BELGELER/de287473-f099-46e0-9a8b-6339d41a649e.xml';
            const xmlFileData = fs.readFileSync(xmlFilePath);
            console.log("burada");
            // Create a temporary directory for storing the ZIP file
            const zipFilePath = 'C:/Users/hafiz/OneDrive/Desktop/E-Fatura Entegrasyon Test/BELGELER/vocoInvoice.zip'; // Specify your temporary directory path
            const zipFileName = 'vocoInvoice.zip';
            console.log(zipFilePath);

            // Create a write stream for the ZIP file
            const output = fs.createWriteStream(zipFilePath);
            const archive = archiver('zip');

            // Pipe the archive to the output stream
            archive.pipe(output);

            // Append the XML file to the archive
            archive.append(xmlFileData, { name: zipFileName });

            // Finalize the archive
            await archive.finalize();

            // Read the ZIP file data
            const zipFileData = fs.readFileSync(zipFilePath);

            // Calculate the MD5 hash of the ZIP data
            const zipFileHash = await this.calculateMD5(zipFileData);

            // Send the ZIP file and its hash using the SOAP client
            const transferResult = await this.client.TransferSalesInvoiceFileAsync(sessionCode, {
                FileNameWithExtension: zipFileName,
                FileDataType: 'XML_INZIP', // Assuming this is the correct enum value
                BinaryData: zipFileData,
                BinaryDataHash: zipFileHash,
                CustomerAlias: 'urn:mail:defaultpk@veriban.com.tr',
                IsDirectSend: true
            });

            console.log('Transfer result:', transferResult);

            // Cleanup: Remove the temporary ZIP file
            fs.unlinkSync(zipFilePath);
        } catch (error) {
            console.error('Error sending invoice:', error);
        }
    }
    private md5 = crypto.createHash('md5');

    private async calculateMD5(data: Buffer): Promise<string> {
        if (data && data.length > 0) {
            const hashData = this.md5.update(data).digest();
            return this.hexBytesToString(hashData);
        }
        return null;
    }

    private async hexBytesToString(bytes: Buffer): Promise<string> {
        let result = '';
        for (const b of bytes) {
            result += b.toString(16).padStart(2, '0');
        }
        return result;
    }

    public async sendInvoice2(sessionCode: string) {

        const fileFullPath = 'C:/Users/hafiz/OneDrive/Desktop/E-Fatura Entegrasyon Test/BELGELER/de287473-f099-46e0-9a8b-6339d41a649e.xml';
        const fileData = fs.readFileSync(fileFullPath);

        const zipFileName = 'vocoInvoice.zip';
        const zipFilePath = 'C:/Users/hafiz/OneDrive/Desktop/E-Fatura Entegrasyon Test/BELGELER/vocoInvoice.zip';
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip');

        output.on('close', async () => {
            try {
                const zipFileData = fs.readFileSync(zipFilePath);
                const zipFileHash = crypto.createHash('md5').update(zipFileData).digest('hex');

                const transferResult = await this.client.TransferSalesInvoiceFileAsync(sessionCode, {
                    FileNameWithExtension: zipFileName,
                    FileDataType: 'XML_INZIP',
                    BinaryData: zipFileData,
                    BinaryDataHash: zipFileHash,
                    CustomerAlias: 'urn:mail:defaultpk@veriban.com.tr',
                    IsDirectSend: true
                });

                console.log('Transfer result:', transferResult);
            } catch (error) {
                console.error('Error transferring sales invoice file:', error);
            }

            fs.unlinkSync(zipFilePath);
        });

        // archive.pipe(output);
        // archive.append(fileData, { name: 'vocoInvoice.zip' });
        // archive.finalize();
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
}