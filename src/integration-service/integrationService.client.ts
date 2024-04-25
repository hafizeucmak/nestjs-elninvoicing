import * as soap from 'soap';

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

    async TransferSalesInvoiceFileAsync(sessionCode: string, transferFileArg: any): Promise<string> {
        try {
            const client = await soap.createClientAsync(this.serviceUrl);
            const transferResult = await client.TransferSalesInvoiceFileAsync({ sessionCode, transferFileArg });
            
            if (transferResult.OperationCompleted) {
                console.log("!!! TRANSFER SUCCESS !!!");
                return transferResult.TransferFileUniqueId;
            } else {
                console.log("!!! TRANSFER FAILURE !!!");
                return "";
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.body);
            } else {
                console.log(error.message);
            }
            return "";
        }
    }
}
