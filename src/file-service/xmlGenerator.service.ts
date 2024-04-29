import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { create } from 'xmlbuilder2';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

@Injectable()
export class XmlGeneratorService {
    public async generateXML(): Promise<string> {

        const uuid = uuidv4();
        const baseId = "VOC20240000000";
        const randomNumber = Math.floor(Math.random() * 90 + 10);
        const invoiceId = baseId + randomNumber.toString();
        const xml = create(
            {
                "Invoice": {
                    "@xsi:schemaLocation": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 ../xsdrt/maindoc/UBL-Invoice-2.1.xsd",
                    "@xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
                    "@xmlns:n4": "http://www.altova.com/samplexml/other-namespace",
                    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "@xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
                    "@xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
                    "@xmlns:ext": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
                    "UBLExtensions": {
                        "UBLExtension": {
                            "ExtensionContent": {
                                "n4:auto-generated_for_wildcard": {}
                            }
                        }
                    },
                    "cbc:UBLVersionID": "2.1",
                    "cbc:CustomizationID": "TR1.2",
                    "cbc:ProfileID": "TEMELFATURA",
                    "cbc:ID": invoiceId,
                    "cbc:CopyIndicator": "false",
                    "cbc:UUID": uuid,
                    "cbc:IssueDate": "2009-01-05",
                    "cbc:IssueTime": "14:42:00",
                    "cbc:InvoiceTypeCode": "SATIS",
                    "cbc:DocumentCurrencyCode": "TRY",
                    "cbc:LineCountNumeric": "1",
                    "cac:InvoicePeriod": {
                        "cbc:StartDate": "2008-12-05",
                        "cbc:EndDate": "2009-01-05"
                    },
                    "cac:Signature": {
                        "cbc:ID": {
                            "@schemeID": "VKN_TCKN",
                            "#text": "12883315211"
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
                            "cac:PartyIdentification": {
                                "cbc:ID": {
                                    "@schemeID": "VKN",
                                    "#text": "9240481875"
                                }
                            },
                            "cac:PartyName": {
                                "cbc:Name": "Müşteri A.Ş."
                            },
                            "cac:PostalAddress": {
                                "cbc:Room": "1",
                                "cbc:StreetName": "Etlik Caddesi",
                                "cbc:BuildingName": "Gelir İdaresi Ek. Hizmet Binası",
                                "cbc:BuildingNumber": "16",
                                "cbc:CitySubdivisionName": "Altındağ",
                                "cbc:CityName": "Ankara",
                                "cbc:PostalZone": "06110",
                                "cbc:Region": "Dışkapı",
                                "cac:Country": {
                                    "cbc:Name": "Türkiye"
                                }
                            },
                            "cac:PartyTaxScheme": {
                                "cac:TaxScheme": {
                                    "cbc:Name": "Başkent"
                                }
                            },
                            "cac:Contact": {
                                "cbc:Telephone": "03123021700",
                                "cbc:Telefax": "03123021539",
                                "cbc:ElectronicMail": "musteri@musteri.com"
                            }
                        }
                    },
                    "cac:PaymentTerms": {
                        "cbc:Note": "Voco Abonelik",
                        "cbc:PaymentDueDate": "2009-01-20"
                    },
                    "cac:TaxTotal": {
                        "cbc:TaxAmount": {
                            "@currencyID": "TRY",
                            "#text": "2.73"
                        },
                        "cac:TaxSubtotal": {
                            "cbc:TaxableAmount": {
                                "@currencyID": "TRY",
                                "#text": "25.20"
                            },
                            "cbc:TaxAmount": {
                                "@currencyID": "TRY",
                                "#text": "2.73"
                            },
                            "cac:TaxCategory": {
                                "cbc:Percent": "12.00",
                                "cac:TaxScheme": {
                                    "cbc:Name": "KDV"
                                }
                            }
                        }
                    },
                    "cac:LegalMonetaryTotal": {
                        "cbc:LineExtensionAmount": {
                            "@currencyID": "TRY",
                            "#text": "25.20"
                        },
                        "cbc:TaxExclusiveAmount": {
                            "@currencyID": "TRY",
                            "#text": "25.20"
                        },
                        "cbc:TaxInclusiveAmount": {
                            "@currencyID": "TRY",
                            "#text": "27.93"
                        },
                        "cbc:PayableAmount": {
                            "@currencyID": "TRY",
                            "#text": "27.93"
                        }
                    },
                    "cac:InvoiceLine": {
                        "cbc:ID": "1",
                        "cbc:InvoicedQuantity": {
                            "@unitCode": "NIU",
                            "#text": "1"
                        },
                        "cbc:LineExtensionAmount": {
                            "@currencyID": "TRY",
                            "#text": "25.20"
                        },
                        "cac:TaxTotal": {
                            "cbc:TaxAmount": {
                                "@currencyID": "TRY",
                                "#text": "2.73"
                            },
                            "cac:TaxSubtotal": {
                                "cbc:TaxableAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "25.20"
                                },
                                "cbc:TaxAmount": {
                                    "@currencyID": "TRY",
                                    "#text": "2.73"
                                },
                                "cac:TaxCategory": {
                                    "cbc:Percent": "12.00",
                                    "cac:TaxScheme": {
                                        "cbc:Name": "KDV"
                                    }
                                }
                            }
                        },
                        "cac:Item": {
                            "cbc:Description": "Voco abonelik",
                            "cbc:Name": "Voco Point"
                        },
                        "cac:Price": {
                            "cbc:PriceAmount": {
                                "@currencyID": "TRY",
                                "#text": "25.20"
                            }
                        }
                    }
                }
            }

            // {
            //     "Invoice": {
            //         "@xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
            //         "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            //         "@xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
            //         "@xmlns:ext": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
            //         "@xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
            //         "@xmlns:xades": "http://uri.etsi.org/01903/v1.3.2#",
            //         "@xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
            //         "@xsi:schemaLocation": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 ..\\xsdrt\\maindoc\\UBL-Invoice-2.1.xsd",
            //         "@xmlns:n4": "http://www.altova.com/samplexml/other-namespace",
            //         "UBLExtensions": {
            //             "UBLExtension": {
            //                 "ExtensionContent": {
            //                     "n4:auto-generated_for_wildcard": {}
            //                 }
            //             }
            //         },
            //         "cbc:UBLVersionID": "2.1",
            //         "cbc:CustomizationID": "TR1.2",
            //         "cbc:ProfileID": "TICARIFATURA",
            //         "cbc:ID": invoiceId,
            //         "cbc:CopyIndicator": "false",
            //         "cbc:UUID": uuid,
            //         "cbc:IssueDate": "2009-01-05",
            //         "cbc:IssueTime": "14:42:00",
            //         "cbc:InvoiceTypeCode": "SATIS",
            //         "cbc:DocumentCurrencyCode": "TRY",
            //         "cbc:LineCountNumeric": "8",
            //         "cac:DespatchDocumentReference": {
            //             "cbc:ID": "180921",
            //             "cbc:IssueDate": "2009-01-02"
            //         },
            //         "cac:Signature": {
            //             "cbc:ID": {
            //                 "@schemeID": "VKN_TCKN",
            //                 "#text": "12883315211"
            //             },
            //             "cac:SignatoryParty": {
            //                 "cac:PartyIdentification": {
            //                     "cbc:ID": {
            //                         "@schemeID": "VKN",
            //                         "#text": "9240481875"
            //                     }
            //                 },
            //                 "cac:PostalAddress": {
            //                     "cbc:StreetName": "Papatya Caddesi Yasemin Sokak",
            //                     "cbc:BuildingNumber": "21",
            //                     "cbc:CitySubdivisionName": "Beşiktaş",
            //                     "cbc:CityName": "İstanbul",
            //                     "cbc:PostalZone": "34100",
            //                     "cac:Country": {
            //                         "cbc:Name": "Türkiye"
            //                     }
            //                 }
            //             },
            //             "cac:DigitalSignatureAttachment": {
            //                 "cac:ExternalReference": {
            //                     "cbc:URI": "#Signature"
            //                 }
            //             }
            //         },
            //         "cac:AccountingSupplierParty": {
            //             "cac:Party": {
            //                 "cbc:WebsiteURI": "http://www.aaa.com.tr/",
            //                 "cac:PartyIdentification": {
            //                     "cbc:ID": {
            //                         "@schemeID": "VKN",
            //                         "#text": "9240481875"
            //                     }
            //                 },
            //                 "cac:PartyName": {
            //                     "cbc:Name": "AAA Anonim Şirketi"
            //                 },
            //                 "cac:PostalAddress": {
            //                     "cbc:ID": "1234567890",
            //                     "cbc:StreetName": "Papatya Caddesi Yasemin Sokak",
            //                     "cbc:BuildingNumber": "21",
            //                     "cbc:CitySubdivisionName": "Beşiktaş",
            //                     "cbc:CityName": "İstanbul",
            //                     "cbc:PostalZone": "34100",
            //                     "cac:Country": {
            //                         "cbc:Name": "Türkiye"
            //                     }
            //                 },
            //                 "cac:PartyTaxScheme": {
            //                     "cac:TaxScheme": {
            //                         "cbc:Name": "Büyük Mükellefler"
            //                     }
            //                 },
            //                 "cac:Contact": {
            //                     "cbc:Telephone": "(212) 925 51515",
            //                     "cbc:Telefax": "(212) 925505015",
            //                     "cbc:ElectronicMail": "aa@aaa.com.tr"
            //                 }
            //             }
            //         },
            //         "cac:AccountingCustomerParty": {
            //             "cac:Party": {
            //                 "cbc:WebsiteURI": "http://www.bbb.com.tr/",
            //                 "cac:PartyIdentification": {
            //                     "cbc:ID": {
            //                         "@schemeID": "VKN",
            //                         "#text": "9205121120"
            //                     }
            //                 },
            //                 "cac:PartyName": {
            //                     "cbc:Name": "BBB Limited  Şirketi"
            //                 },
            //                 "cac:PostalAddress": {
            //                     "cbc:ID": "1234567890",
            //                     "cbc:StreetName": "Ihlamur Mahallesi Selvi Caddesi Sedir Sokak",
            //                     "cbc:BuildingNumber": "75/A",
            //                     "cbc:CitySubdivisionName": "Kızılay",
            //                     "cbc:CityName": "Ankara",
            //                     "cbc:PostalZone": "06100",
            //                     "cac:Country": {
            //                         "cbc:Name": "Türkiye"
            //                     }
            //                 },
            //                 "cac:PartyTaxScheme": {
            //                     "cac:TaxScheme": {
            //                         "cbc:Name": "Çankaya"
            //                     }
            //                 },
            //                 "cac:Contact": {
            //                     "cbc:Telephone": "(312) 621 1111",
            //                     "cbc:Telefax": "(312) 621 1010",
            //                     "cbc:ElectronicMail": "bb@bbb.com.tr"
            //                 }
            //             }
            //         },
            //         "cac:PaymentMeans": {
            //             "cbc:PaymentMeansCode": "1",
            //             "cac:PayeeFinancialAccount": {
            //                 "cbc:ID": "5652214414",
            //                 "cbc:CurrencyCode": "TRY",
            //                 "cbc:PaymentNote": "RRR Bankası Beşiktaş Şubesi TL Hesabı"
            //             }
            //         },
            //         "cac:PaymentTerms": {
            //             "cbc:Note": "Voco Abonelik",
            //             "cbc:PaymentDueDate": "2008-11-25"
            //         },
            //         "cac:TaxTotal": {
            //             "cbc:TaxAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "4538.97"
            //             },
            //             "cac:TaxSubtotal": {
            //                 "cbc:TaxableAmount": {
            //                     "@currencyID": "TRY",
            //                     "#text": "25216.50"
            //                 },
            //                 "cbc:TaxAmount": {
            //                     "@currencyID": "TRY",
            //                     "#text": "4538.97"
            //                 },
            //                 "cbc:CalculationSequenceNumeric": "1",
            //                 "cbc:Percent": "18.00",
            //                 "cac:TaxCategory": {
            //                     "cac:TaxScheme": {
            //                         "cbc:Name": "KDV"
            //                     }
            //                 }
            //             }
            //         },
            //         "cac:LegalMonetaryTotal": {
            //             "cbc:LineExtensionAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "25216.50"
            //             },
            //             "cbc:TaxExclusiveAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "20677.53"
            //             },
            //             "cbc:TaxInclusiveAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "25216.50"
            //             },
            //             "cbc:AllowanceTotalAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "0.00"
            //             },
            //             "cbc:ChargeTotalAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "0.00"
            //             },
            //             "cbc:PayableAmount": {
            //                 "@currencyID": "TRY",
            //                 "#text": "25216.50"
            //             }
            //         },
            //         "cac:InvoiceLine": [
            //             {
            //                 "cbc:ID": "1",
            //                 "cbc:InvoicedQuantity": {
            //                     "@unitCode": "C62",
            //                     "#text": "10"
            //                 },
            //                 "cbc:LineExtensionAmount": {
            //                     "@currencyID": "TRY",
            //                     "#text": "1050.00"
            //                 },
            //                 "cac:TaxTotal": {
            //                     "cbc:TaxAmount": {
            //                         "@currencyID": "TRY",
            //                         "#text": "189.00"
            //                     },
            //                     "cac:TaxSubtotal": {
            //                         "cbc:TaxableAmount": {
            //                             "@currencyID": "TRY",
            //                             "#text": "1050.00"
            //                         },
            //                         "cbc:TaxAmount": {
            //                             "@currencyID": "TRY",
            //                             "#text": "189.00"
            //                         },
            //                         "cbc:CalculationSequenceNumeric": "1",
            //                         "cbc:Percent": "18.00",
            //                         "cac:TaxCategory": {
            //                             "cac:TaxScheme": {
            //                                 "cbc:Name": "KDV"
            //                             }
            //                         }
            //                     }
            //                 },
            //                 "cac:Item": {
            //                     "cbc:Name": "Kazak"
            //                 },
            //                 "cac:Price": {
            //                     "cbc:PriceAmount": {
            //                         "@currencyID": "TRY",
            //                         "#text": "105.00"
            //                     }
            //                 }
            //             }
            //         ]
            //     }
            // }
        ).end({ prettyPrint: true });

        return await this.uploadToS3(xml, "xml-invoice");
    }

    public async uploadToS3(data: any, bucketName: string): Promise<string> {

        const s3Client = new S3Client({
            region: process.env.S3CLIENT_REGION,
            credentials: {
                accessKeyId: process.env.S3CLIENT_ACCESSKEY,
                secretAccessKey: process.env.S3CLIENT_SECRETKEY,
            },
        });

        const s3BucketName = bucketName;
        const s3ObjectKey = uuidv4();

        try {
            let bodyData;
            if (typeof data === 'string') {
                bodyData = data;
            } else if (Buffer.isBuffer(data)) {
                bodyData = data.toString('binary');
            } else {
                throw new Error('Data must be of type string or Buffer');
            }

            const command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key:  `${s3ObjectKey}.xml`,
                Body: bodyData,
                ContentType: 'text/xml'
            });

            await s3Client.send(command);
            return s3ObjectKey;

        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
        }
    }
}