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
}
