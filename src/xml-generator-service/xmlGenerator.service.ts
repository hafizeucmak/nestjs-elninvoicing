import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { create } from 'xmlbuilder2';

@Injectable()
export class XmlGeneratorService {
    public async generateXML(): Promise<string> {


        const xml = create(

            {
                "Invoice": {
                    "@xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
                    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "@xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
                    "@xmlns:ext": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
                    "@xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
                    "@xmlns:xades": "http://uri.etsi.org/01903/v1.3.2#",
                    "@xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
                    "@xsi:schemaLocation": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 ..\\xsdrt\\maindoc\\UBL-Invoice-2.1.xsd",
                    "@xmlns:n4": "http://www.altova.com/samplexml/other-namespace",
                    "UBLExtensions": {
                        "UBLExtension": {
                            "ExtensionContent": {
                                "n4:auto-generated_for_wildcard": {}
                            }
                        }
                    },
                    "cbc:UBLVersionID": "2.1",
                    "cbc:CustomizationID": "TR1.2",
                    "cbc:ProfileID": "TICARIFATURA",
                    "cbc:ID": "GIB2009000000011",
                    "cbc:CopyIndicator": "false",
                    "cbc:UUID": "F47AC10B-58CC-4372-A567-0E02B2C3D479",
                    "cbc:IssueDate": "2009-01-05",
                    "cbc:IssueTime": "14:42:00",
                    "cbc:InvoiceTypeCode": "SATIS",
                    "cbc:DocumentCurrencyCode": "TRY",
                    "cbc:LineCountNumeric": "8",
                    "cac:DespatchDocumentReference": {
                        "cbc:ID": "180921",
                        "cbc:IssueDate": "2009-01-02"
                    },
                    "cac:Signature": {
                        "cbc:ID": {
                            "@schemeID": "VKN_TCKN",
                            "#text": "9240481875"
                        },
                        "cac:SignatoryParty": {
                            "cac:PartyIdentification": {
                                "cbc:ID": {
                                    "@schemeID": "VKN",
                                    "#text": "9240481875"
                                }
                            },
                            "cac:PostalAddress": {
                                "cbc:StreetName": "Papatya Caddesi Yasemin Sokak",
                                "cbc:BuildingNumber": "21",
                                "cbc:CitySubdivisionName": "Beşiktaş",
                                "cbc:CityName": "İstanbul",
                                "cbc:PostalZone": "34100",
                                "cac:Country": {
                                    "cbc:Name": "Türkiye"
                                }
                            }
                        },
                        "cac:DigitalSignatureAttachment": {
                            "cac:ExternalReference": {
                                "cbc:URI": "#Signature"
                            }
                        }
                    },
                    "cac:AccountingSupplierParty": {
                        "cac:Party": {
                            "cbc:WebsiteURI": "http://www.aaa.com.tr/",
                            "cac:PartyIdentification": {
                                "cbc:ID": {
                                    "@schemeID": "VKN",
                                    "#text": "9240481875"
                                }
                            },
                            "cac:PartyName": {
                                "cbc:Name": "AAA Anonim Şirketi"
                            },
                            "cac:PostalAddress": {
                                "cbc:ID": "1234567890",
                                "cbc:StreetName": "Papatya Caddesi Yasemin Sokak",
                                "cbc:BuildingNumber": "21",
                                "cbc:CitySubdivisionName": "Beşiktaş",
                                "cbc:CityName": "İstanbul",
                                "cbc:PostalZone": "34100",
                                "cac:Country": {
                                    "cbc:Name": "Türkiye"
                                }
                            },
                            "cac:PartyTaxScheme": {
                                "cac:TaxScheme": {
                                    "cbc:Name": "Büyük Mükellefler"
                                }
                            },
                            "cac:Contact": {
                                "cbc:Telephone": "(212) 925 51515",
                                "cbc:Telefax": "(212) 925505015",
                                "cbc:ElectronicMail": "aa@aaa.com.tr"
                            }
                        }
                    },
                    "cac:AccountingCustomerParty": {
                        "cac:Party": {
                            "cbc:WebsiteURI": "http://www.bbb.com.tr/",
                            "cac:PartyIdentification": {
                                "cbc:ID": {
                                    "@schemeID": "VKN",
                                    "#text": "9205121120"
                                }
                            },
                            "cac:PartyName": {
                                "cbc:Name": "BBB Limited  Şirketi"
                            },
                            "cac:PostalAddress": {
                                "cbc:ID": "1234567890",
                                "cbc:StreetName": "Ihlamur Mahallesi Selvi Caddesi Sedir Sokak",
                                "cbc:BuildingNumber": "75/A",
                                "cbc:CitySubdivisionName": "Kızılay",
                                "cbc:CityName": "Ankara",
                                "cbc:PostalZone": "06100",
                                "cac:Country": {
                                    "cbc:Name": "Türkiye"
                                }
                            },
                            "cac:PartyTaxScheme": {
                                "cac:TaxScheme": {
                                    "cbc:Name": "Çankaya"
                                }
                            },
                            "cac:Contact": {
                                "cbc:Telephone": "(312) 621 1111",
                                "cbc:Telefax": "(312) 621 1010",
                                "cbc:ElectronicMail": "bb@bbb.com.tr"
                            }
                        }
                    },
                    "cac:PaymentMeans": {
                        "cbc:PaymentMeansCode": "1",
                        "cac:PayeeFinancialAccount": {
                            "cbc:ID": "5652214414",
                            "cbc:CurrencyCode": "TRY",
                            "cbc:PaymentNote": "RRR Bankası Beşiktaş Şubesi TL Hesabı"
                        }
                    },
                    "cac:PaymentTerms": {
                        "cbc:Note": "Fatura düzenlenme tarihinden itibaren 20 gün içerisinde ödenecektir.",
                        "cbc:PaymentDueDate": "2008-11-25"
                    },
                    "cac:TaxTotal": {
                        "cbc:TaxAmount": {
                            "@currencyID": "TRY",
                            "#text": "4538.97"
                        },
                        "cac:TaxSubtotal": {
                            "cbc:TaxableAmount": {
                                "@currencyID": "TRY",
                                "#text": "25216.50"
                            },
                            "cbc:TaxAmount": {
                                "@currencyID": "TRY",
                                "#text": "4538.97"
                            },
                            "cbc:CalculationSequenceNumeric": "1",
                            "cbc:Percent": "18.00",
                            "cac:TaxCategory": {
                                "cac:TaxScheme": {
                                    "cbc:Name": "KDV"
                                }
                            }
                        }
                    },
                    "cac:LegalMonetaryTotal": {
                        "cbc:LineExtensionAmount": {
                            "@currencyID": "TRY",
                            "#text": "25216.50"
                        },
                        "cbc:TaxExclusiveAmount": {
                            "@currencyID": "TRY",
                            "#text": "20677.53"
                        },
                        "cbc:TaxInclusiveAmount": {
                            "@currencyID": "TRY",
                            "#text": "25216.50"
                        },
                        "cbc:AllowanceTotalAmount": {
                            "@currencyID": "TRY",
                            "#text": "0.00"
                        },
                        "cbc:ChargeTotalAmount": {
                            "@currencyID": "TRY",
                            "#text": "0.00"
                        },
                        "cbc:PayableAmount": {
                            "@currencyID": "TRY",
                            "#text": "25216.50"
                        }
                    },
                    "cac:InvoiceLine": [
                        {
                            "cbc:ID": "1",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "10"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "1050.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "189.00"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "1050.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "189.00"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Kazak"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "105.00"
                                }
                            }
                        },
                        {
                            "cbc:ID": "2",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "50"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "1300.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "234.00"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "1300.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "234.00"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Pantolon"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "26.00"
                                }
                            }
                        },
                        {
                            "cbc:ID": "3",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "30"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "12320.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2217.60"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "12320.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2217.60"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Ceket"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "410.00"
                                }
                            }
                        },
                        {
                            "cbc:ID": "4",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "20"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "12950.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2331.00"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "12950.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2331.00"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Mont"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "647.50"
                                }
                            }
                        },
                        {
                            "cbc:ID": "5",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "15"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "12500.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2250.00"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "12500.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2250.00"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Gömlek"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "833.33"
                                }
                            }
                        },
                        {
                            "cbc:ID": "6",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "40"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "15800.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2844.00"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "15800.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2844.00"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Gözlük"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "395.00"
                                }
                            }
                        },
                        {
                            "cbc:ID": "7",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "25"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "13125.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2362.50"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "13125.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2362.50"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Halı"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "525.00"
                                }
                            }
                        },
                        {
                            "cbc:ID": "8",
                            "cbc:InvoicedQuantity": {
                                "@unitCode": "C62",
                                "#text": "35"
                            },
                            "cbc:LineExtensionAmount": {
                                "@currencyID": "TRY",
                                "#text": "13860.00"
                            },
                            "cac:TaxTotal": {
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2494.80"
                                },
                                "cac:TaxSubtotal": {
                                    "cbc:TaxableAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "13860.00"
                                    },
                                    "cbc:TaxAmount": {
                                        "@currencyID": "TRY",
                                        "#text": "2494.80"
                                    },
                                    "cbc:CalculationSequenceNumeric": "1",
                                    "cbc:Percent": "18.00",
                                    "cac:TaxCategory": {
                                        "cac:TaxScheme": {
                                            "cbc:Name": "KDV"
                                        }
                                    }
                                }
                            },
                            "cac:Item": {
                                "cbc:Name": "Ayakkabı"
                            },
                            "cac:Price": {
                                "cbc:PriceAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "396.00"
                                }
                            }
                        }
                    ]
                }
            }
        ).end({ prettyPrint: true });

        const url = await this.uploadToS3(xml);
        return url;
    }
    private async uploadToS3(xmlData: string): Promise<string> {
        // Configure AWS SDK with your credentials and S3 bucket details
        const s3Client = new S3Client({
            region: process.env.S3CLIENT_REGION,
            credentials: {
                accessKeyId: process.env.S3CLIENT_ACCESSKEY,
                secretAccessKey: process.env.S3CLIENT_SECRETKEY,
            },
        });

        const s3BucketName = 'xml-invoice';
        const s3ObjectKey = 'generated-invoice.xml'; // Choose your desired object key

        // Upload XML file to S3
        try {
            const command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key: s3ObjectKey,
                Body: xmlData,
            });
            await s3Client.send(command);
            return s3ObjectKey;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
        }
    }
}