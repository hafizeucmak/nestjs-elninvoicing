interface Invoice {
    "@xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    "@xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
    "@xmlns:ext": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
    "@xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
    "@xmlns:xades": "http://uri.etsi.org/01903/v1.3.2#",
    "@xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
    "@xsi:schemaLocation": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 ..\\xsdrt\\maindoc\\UBL-Invoice-2.1.xsd",
    "@xmlns:n4": "http://www.altova.com/samplexml/other-namespace",
    UBLExtensions: UBLExtensions;
    "cbc:UBLVersionID": string;
    "cbc:CustomizationID": string;
    "cbc:ProfileID": string;
    "cbc:ID": string;
    "cbc:CopyIndicator": string;
    "cbc:UUID": string;
    "cbc:IssueDate": string;
    "cbc:IssueTime": string;
    "cbc:InvoiceTypeCode": string;
    "cbc:DocumentCurrencyCode": string;
    "cbc:LineCountNumeric": string;
    "cac:DespatchDocumentReference": DespatchDocumentReference;
    "cac:Signature": Signature;
    "cac:AccountingSupplierParty": AccountingParty;
    "cac:AccountingCustomerParty": AccountingParty;
    "cac:PaymentMeans": PaymentMeans;
    "cac:PaymentTerms": PaymentTerms;
    "cac:TaxTotal": TaxTotal;
    "cac:LegalMonetaryTotal": LegalMonetaryTotal;
    "cac:InvoiceLine": InvoiceLine[];
}

interface UBLExtensions {
    UBLExtension: {
        ExtensionContent: {
            "n4:auto-generated_for_wildcard": any;
        };
    };
}

interface DespatchDocumentReference {
    "cbc:ID": string;
    "cbc:IssueDate": string;
}

interface Signature {
    "cbc:ID": {
        "@schemeID": string;
        "#text": string;
    };
    "cac:SignatoryParty": SignatoryParty;
    "cac:DigitalSignatureAttachment": {
        "cac:ExternalReference": {
            "cbc:URI": string;
        };
    };
}

interface SignatoryParty {
    "cac:PartyIdentification": {
        "cbc:ID": {
            "@schemeID": string;
            "#text": string;
        };
    };
    "cac:PostalAddress": PostalAddress;
}

interface PostalAddress {
    "cbc:StreetName": string;
    "cbc:BuildingNumber": string;
    "cbc:CitySubdivisionName": string;
    "cbc:CityName": string;
    "cbc:PostalZone": string;
    "cac:Country": {
        "cbc:Name": string;
    };
}

interface AccountingParty {
    "cbc:WebsiteURI": string;
    "cac:PartyIdentification": {
        "cbc:ID": {
            "@schemeID": string;
            "#text": string;
        };
    };
    "cac:PartyName": {
        "cbc:Name": string;
    };
    "cac:PostalAddress": PostalAddress;
    "cac:PartyTaxScheme": {
        "cac:TaxScheme": {
            "cbc:Name": string;
        };
    };
    "cac:Contact": {
        "cbc:Telephone": string;
        "cbc:Telefax": string;
        "cbc:ElectronicMail": string;
    };
}

interface PaymentMeans {
    "cbc:PaymentMeansCode": string;
    "cac:PayeeFinancialAccount": {
        "cbc:ID": string;
        "cbc:CurrencyCode": string;
        "cbc:PaymentNote": string;
    };
}

interface PaymentTerms {
    "cbc:Note": string;
    "cbc:PaymentDueDate": string;
}

interface TaxTotal {
    "cbc:TaxAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cac:TaxSubtotal": {
        "cbc:TaxableAmount": {
            "@currencyID": string;
            "#text": string;
        };
        "cbc:TaxAmount": {
            "@currencyID": string;
            "#text": string;
        };
        "cbc:CalculationSequenceNumeric": string;
        "cbc:Percent": string;
        "cac:TaxCategory": {
            "cac:TaxScheme": {
                "cbc:Name": string;
            };
        };
    };
}

interface LegalMonetaryTotal {
    "cbc:LineExtensionAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cbc:TaxExclusiveAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cbc:TaxInclusiveAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cbc:AllowanceTotalAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cbc:ChargeTotalAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cbc:PayableAmount": {
        "@currencyID": string;
        "#text": string;
    };
}

interface InvoiceLine {
    "cbc:ID": string;
    "cbc:InvoicedQuantity": {
        "@unitCode": string;
        "#text": string;
    };
    "cbc:LineExtensionAmount": {
        "@currencyID": string;
        "#text": string;
    };
    "cac:TaxTotal": TaxTotal;
    "cac:Item": {
        "cbc:Name": string;
    };
    "cac:Price": {
        "cbc:PriceAmount": {
            "@currencyID": string;
            "#text": string;
        };
    };
}
