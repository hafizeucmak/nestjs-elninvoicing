export class TransferFileArgs {
    FileNameWithExtension: string;
    FileDataType: string;
    BinaryData: Buffer;
    BinaryDataHash: string;
    CustomerAlias: string;
    IsDirectSend: boolean;
}