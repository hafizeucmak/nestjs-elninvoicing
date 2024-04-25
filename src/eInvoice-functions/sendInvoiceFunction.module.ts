import { Module } from '@nestjs/common';
import { ElninvoiceService } from './sendInvoiceFunction.service';
import { XmlGeneratorService } from 'src/file-service/xmlGenerator.service';
import { ZipConvertorService } from 'src/file-service/zipConvertor.service';

@Module({
  providers: [ElninvoiceService, XmlGeneratorService,ZipConvertorService]
})
export class ElninvoiceModule {}
