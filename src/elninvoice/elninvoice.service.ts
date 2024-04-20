import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ElninvoiceService {

    @Cron(CronExpression.EVERY_HOUR)
    async handleCron() {
        console.log('Saved user information to MongoDB:');
    }
}