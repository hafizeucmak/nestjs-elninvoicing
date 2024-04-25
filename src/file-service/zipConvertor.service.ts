import { Injectable } from '@nestjs/common';
import * as JSZip from 'jszip';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class ZipConvertorService {
    async generateZipAndHash(fileUrl: string): Promise<{ zipFile: Buffer, hash: string }> {
        try {
            console.log(fileUrl);
            const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
            const xmlData = Buffer.from(response.data, 'binary');

            const zip = new JSZip();

            zip.file('generated-invoice.xml', xmlData);

            const zipFile = await zip.generateAsync({ type: 'nodebuffer' });

            const hash = await this.calculateMD5(zipFile);

            return { zipFile, hash };
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
}
