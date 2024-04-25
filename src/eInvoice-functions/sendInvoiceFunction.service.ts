import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IntegrationServiceClient } from 'src/integration-service/integrationService.client';
import { XmlGeneratorService } from 'src/file-service/xmlGenerator.service';
import { ZipConvertorService } from 'src/file-service/zipConvertor.service';
import { TransferFileArgs } from 'src/dtos/transferFileArgs.dto';

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
            console.log('Logged in successfully. Session code:', sessionCode);

            const uniqueId = await this.xmlGenerator.generateXML();

            const zipFile = await this.zipConvertor.generateZipAndHash(uniqueId);

            await this.xmlGenerator.uploadZipToS3(zipFile.zipFile, "zip-invoice");
console.log(zipFile);
            const transferFileArgs: TransferFileArgs = {
                FileNameWithExtension: zipFile.uniqueId + ".zip",
                FileDataType: 'XML_INZIP',
                BinaryData: zipFile.zipFile,
                BinaryDataHash: zipFile.hash,
                CustomerAlias: 'urn:mail:defaultpk@veriban.com.tr',
                IsDirectSend: true
            };


            var result = await this.client.TransferSalesInvoiceFileAsync(sessionCode, transferFileArgs);


            
            console.log(result);

        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure...
        }
    }
}