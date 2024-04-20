import { Module } from '@nestjs/common';
import { ElninvoiceService } from './elninvoice.service';

@Module({
  providers: [ElninvoiceService]
})
export class ElninvoiceModule {}
