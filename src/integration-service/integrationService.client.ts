import * as soap from 'soap';
import { TransferFileArgs } from 'src/dtos/transferFileArgs.dto';

export class IntegrationServiceClient {
    private readonly serviceUrl: string;

    constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
    }

    async LoginAsync(username: string, password: string): Promise<string> {
        try {
            const client = await soap.createClientAsync(this.serviceUrl);
            const result = await client.LoginAsync({userName : username, password : password});
            return result[0].LoginResult;
        } catch (error) {
            throw new Error(`Login failed: ${error}`);
        }
    }

    async TransferSalesInvoiceFileAsync(sessionCode: string, transferFileArg: TransferFileArgs): Promise<string> {
        try {
            const client = await soap.createClientAsync(this.serviceUrl);
        const transferResult = await client.TransferSalesInvoiceFileAsync({ sessionCode: sessionCode, transferFile: transferFileArg });
        
        if (transferResult && transferResult.OperationCompleted) {
            console.log("!!! TRANSFER SUCCESS !!!");
            console.log("TRANSFER DOCUMENT NUMBER [ " + transferResult.TransferFileUniqueId + " ]");
            return transferResult.TransferFileUniqueId;
        } else {
            console.log("!!! TRANSFER FAILURE !!!");
            return ""; 
        }
        } catch (error) {
            console.error("Error transferring sales invoice file:", error);
        // Handle different types of errors
        if (error.response) {
            console.log(error.response.body);
        } else {
            console.log(error.message);
        }
        return ""; // Or handle error scenario as needed
        }
    }
}
