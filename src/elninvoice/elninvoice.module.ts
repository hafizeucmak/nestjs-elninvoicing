import { Module } from '@nestjs/common';
import { ElninvoiceService } from './elninvoice.service';
import { XmlGeneratorService } from 'src/xml-generator-service/xmlGenerator.service';

@Module({
  providers: [ElninvoiceService, XmlGeneratorService]
})
export class ElninvoiceModule {}
