import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IntegrationServiceClient } from 'src/integration-service/integrationService.client';
import { XmlGeneratorService } from 'src/xml-generator-service/xmlGenerator.service';

@Injectable()
export class ElninvoiceService {
        private readonly client: IntegrationServiceClient;
        private readonly xmlGenerator: XmlGeneratorService;

    constructor() {
        this.client = new IntegrationServiceClient(process.env.VERIBAN_SERVICE_URL);
        this.xmlGenerator = new XmlGeneratorService();
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        try {
            // const sessionCode = await this.client.LoginAsync(process.env.VERIBAN_USERNAME, process.env.VERIBAN_PASSWORD);
            // console.log('Logged in successfully. Session code:', sessionCode);
            const url = await this.xmlGenerator.generateXML();

            console.log(url);

            // Perform other tasks with the session code...
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure...
        }
    }
}