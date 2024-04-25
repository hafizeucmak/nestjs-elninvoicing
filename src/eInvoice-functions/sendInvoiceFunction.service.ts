import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IntegrationServiceClient } from 'src/integration-service/integrationService.client';
import { XmlGeneratorService } from 'src/file-service/xmlGenerator.service';
import { ZipConvertorService } from 'src/file-service/zipConvertor.service';

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

            const url = await this.xmlGenerator.generateXML();

            const zipFile = await this.zipConvertor.generateZipAndHash(url);

            await this.xmlGenerator.uploadToS3(zipFile, "zip-invoice");

            var result = await this.client.TransferSalesInvoiceFileAsync(sessionCode, zipFile);


            
            console.log(result);

        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure...
        }
    }
}