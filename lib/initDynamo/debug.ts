import {CloudFormationCustomResourceEvent} from "aws-lambda";

const evEnv = {
    "AWS_LAMBDA_FUNCTION_VERSION": "$LATEST",
    "AWS_SESSION_TOKEN": "IQoJb3JpZ2luX2VjEGwaCXVzLWVhc3QtMSJIMEYCIQDpumjNBYD51tqDWRjTp2MrUTpSAPri57U7m1lqypXrJwIhALuawuzC8ghC6pgNC5W5+gidME+yaWqRX5WIk1PUImUkKqcDCGUQABoMMDE3ODIwNjYzOTc5IgyR4gfzRqUsjmgXoEkqhAPXMDFx8nAHStOcg9qG9RxVlUA+9W5HvhKYnGaHcxDhDee48/kYHuEKsbFPSG8NC73uvPEJi1fPIrlrub2S4SHscUO4W401GXA5NK58hk8Mpu/5JNX4AW4HdyFKoGk+siCdv5MPg/fDfzK1KBr9e4Aq1GE/3GoBgnQqe1u6dBbnO0CGpfLuKWUnJRAIUhPycM8Ekl7bFQ03VITl56JkfJsMvQieXw6wd73gB2qsgjmFp9T38g3JW0zl7ztSrp2YCVdRVTvIL3lUZxslXsm+Cw4rzYl4Xqp4upnS9+DyW3fZ7KsML3Q3cEnC2WMUq1uvCcf8qMaMfs5LTwBn/7jExkdQP3M5wyOD8A6YegZ1PPfdLaCQf0gphm2QWtvWsXsBSodNnTS2W55gqMo+mGk4lcbEt34S3XE9xiLGsiHuurVa/3hIqc3y+oEOXRf7XEUfbe//7MnY6yR7WTpcB0PiOWPHnq/yCiQxz599l7epEySVRtsXvTRvW9cMvHG45EPXhHw6OHhvMOaD37UGOpwBdxRMWrMA86qrE/KOkeMxvEXjaN4bvS8a1P8FvpgV0GNp4TpxF0w1Y5zpfqLHjwonh3PzSxZcIjfLnbDljkebnZklAF69RleKBeCKAOSErTKRc5xpF1dS97ySpsS9FDf0r7UCz1Cn6qGY7RF/Zun7+GiFuRCdrM7NDwU1rKjzY3tY3Yp1Sd26G9pxg/FhmhQtIZpiqCyAVpJu1pZ2",
    "LAMBDA_TASK_ROOT": "/var/task",
    "LD_LIBRARY_PATH": "/var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib",
    "AWS_LAMBDA_LOG_GROUP_NAME": "/aws/lambda/tmp-tst-initdatafuncBA2C4D70-bVBxCupNP6Nn",
    "AWS_LAMBDA_LOG_STREAM_NAME": "2024/08/10/[$LATEST]e5d12ba6556c42889005a28c185336b1",
    "AWS_LAMBDA_RUNTIME_API": "127.0.0.1:9001",
    "AWS_EXECUTION_ENV": "AWS_Lambda_nodejs18.x",
    "AWS_LAMBDA_FUNCTION_NAME": "tmp-tst-initdatafuncBA2C4D70-bVBxCupNP6Nn",
    "AWS_XRAY_DAEMON_ADDRESS": "169.254.79.129:2000",
    "PATH": "/var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin",
    "AWS_DEFAULT_REGION": "us-east-1",
    "PWD": "/var/task",
    "AWS_SECRET_ACCESS_KEY": "tLongBd/6iICGb5/FXkvKbDzavV0s25QqAu3LuyI",
    "LANG": "en_US.UTF-8",
    "LAMBDA_RUNTIME_DIR": "/var/runtime",
    "tableName": "tmp-tst-configTable71CEAB13-1T6J1TN2D9C07",
    "AWS_LAMBDA_INITIALIZATION_TYPE": "on-demand",
    "NODE_PATH": "/opt/nodejs/node18/node_modules:/opt/nodejs/node_modules:/var/runtime/node_modules:/var/runtime:/var/task",
    "AWS_REGION": "us-east-1",
    "TZ": ":UTC",
    "AWS_ACCESS_KEY_ID": "ASIAQIJRRYCVSTRQXT6H",
    "SHLVL": "0",
    "_AWS_XRAY_DAEMON_ADDRESS": "169.254.79.129",
    "_AWS_XRAY_DAEMON_PORT": "2000",
    "AWS_XRAY_CONTEXT_MISSING": "LOG_ERROR",
    "_HANDLER": "index.handler",
    "AWS_LAMBDA_FUNCTION_MEMORY_SIZE": "128",
    "NODE_EXTRA_CA_CERTS": "/var/runtime/ca-cert.pem",
    "_X_AMZN_TRACE_ID": "Root=1-66b7c1e5-31054dd13d7057734f92a2ca;Parent=341591b214e4bfe1;Sampled=0;Lineage=15ea0b82:0|0acafaef:0"
} as { [k: string]: string }

for (const k in evEnv) {
    process.env[k] = evEnv[k]!
}


/*-------------------------------------------------------------*/

async function loadENVs() {
    // process.env.buildId = "odmd-contracts";
    // process.env.odmd_ghApp_ID = "377358";
    // process.env.odmd_ghApp_installationID = "41561130";
    // process.env.ghApp_key_secret_name = "github-app-377358-privatekey";

    process.env.postgresHostname = "127.0.0.1";

    const region = 'us-west-1'

    process.env.AWS_REGION = region
    process.env.AWS_DEFAULT_REGION = region

    /*
    [017820663979_AdministratorAccess]
aws_access_key_id=
aws_secret_access_key=
aws_session_token=
    * */

    process.env.AWS_ACCESS_KEY_ID = "ASIAQIJRRYCV43VMHCGU"
    process.env.AWS_SECRET_ACCESS_KEY = "g6RLCWjZuCGueFpFJOS9B3eMw+P2WZQECzgiq+As"
    process.env.AWS_SESSION_TOKEN = "IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMSJHMEUCICQseCg1sOdhCSaLQ5DnTAQ/rebxA+gwb4B+EijbpzeYAiEA14AF0WovIJoGknkffjlIh6i7NQEiBUV9yJvm4vdVthAqjAMIaBAAGgwwMTc4MjA2NjM5NzkiDOtlg41YjGJjEBVt5irpAiZABpRs1rXvKbS2VABC0844xChkae4Y0Tkzr86EJXHYUjWX2/2e6YIfNYrSLhfLvGIuSeox02rvDrmEQvW4CQF3lTZi41acJw2frKy4LJ8KLS01euHDQDaKXkQH6aKm7Q9tBaeqHIrqdz7xIVw/5x8F4HODPLAQ26+OpMFPyscMPyDiQs8ZUHiiB30OUQ37HC0OEn293txhPcGwl6M65EMifqf6IOJygw2FcYerOX2fFgTD6Wbd7baqDI3nyxAptl3yGUR5VmEW9y4ob+Zo1VSQugoaFL+haXbgK4H8OJIlldXmIOQXJXeoPoc8w3JGiIiK+CJYJ1oNoNDELgVFnBFcmu/OqNUz0SA+ia5nCEOv7fml9MHEk/XX8o0Lybi7m1/OQeOpyNHdGCPMYWfhw2SepHKYqDrGOFZ3cKMjYMC+rOZY4uucCRuCrFK/o7CjbcbjWVoVExlKz+xyCvfxQUKrwkObL6Qx0YQwvN3ftQY6pgH5NfGsbdm2twATjzoIDXgJaUpvTZzQTkfDmkADKfreY8KDE5o9xfppBzyMudzn0PEoq5xs1AwdY0TQ67OJLuFXOZYKOyDHWKvQYP1zb3gR6XRgAo8MFX+e/ihW1QSOwM9OURTl1YgV56TF9x1vHu8z+Y9LEukF6r1wWEKluKdLTIaWzhQzPS3rtzca8xOnpbz25WVd4q9l+3mcrmysmVjU9loXaiHM"
}

async function main() {
    await loadENVs();

    const createEvent = {
        "RequestType": "Create",
        "ServiceToken": "arn:aws:lambda:us-east-1:017820663979:function:tmp-tst-initdataprvdframeworkonEvent7BB84B21-4DmnNl2Y0NWA",
        "ResponseURL": "https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/arn%3Aaws%3Acloudformation%3Aus-east-1%3A017820663979%3Astack/tmp-tst/4dbb72c0-575d-11ef-a00b-0ed8e477be05%7Cinitdata%7C30f9608c-774b-4a9a-8e33-87c0d38756fe?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240810T211405Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIA6L7Q4OWTTG64LAV5%2F20240810%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=52b09a6474d8924445ccc2e9079bc310fe05f89b903ec54bb11111032260430c",
        "StackId": "arn:aws:cloudformation:us-east-1:017820663979:stack/tmp-tst/4dbb72c0-575d-11ef-a00b-0ed8e477be05",
        "RequestId": "30f9608c-774b-4a9a-8e33-87c0d38756fe",
        "LogicalResourceId": "initdata",
        "ResourceType": "AWS::CloudFormation::CustomResource",
        "ResourceProperties": {
            "ServiceToken": "arn:aws:lambda:us-east-1:017820663979:function:tmp-tst-initdataprvdframeworkonEvent7BB84B21-4DmnNl2Y0NWA",
            "initData": [
                {
                    "pk": {
                        "S": "menu"
                    },
                    "value": {
                        "L": [
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_espresso-alternative"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Espresso"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_cappuccino-alternative"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Cappuccino"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_cafe-latte"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Latte"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_flat-white-alternative@2x"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Flat White"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_americano"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Americano"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_americano"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Coffee of the day"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "maxOrdersPerUser": {
                        "N": "1"
                    },
                    "pk": {
                        "S": "config"
                    },
                    "maxOrdersInQueue": {
                        "N": "10"
                    },
                    "storeOpen": {
                        "BOOL": "true"
                    }
                }
            ]
        }
    } as CloudFormationCustomResourceEvent

    const deleteEvent = {
        "RequestType": "Delete",
        "ServiceToken": "arn:aws:lambda:us-east-1:017820663979:function:tmp-tst-initdataprvdframeworkonEvent7BB84B21-4DmnNl2Y0NWA",
        "ResponseURL": "https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/arn%3Aaws%3Acloudformation%3Aus-east-1%3A017820663979%3Astack/tmp-tst/4dbb72c0-575d-11ef-a00b-0ed8e477be05%7Cinitdata%7C06ee38a8-31fd-483d-adb3-615a6f8cfd19?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240810T222246Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIA6L7Q4OWTTG64LAV5%2F20240810%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ec70fc52d81d34fe048ca6b64f628ce8ce5bb3dd85a7c4ea72edfec95aaaa973",
        "StackId": "arn:aws:cloudformation:us-east-1:017820663979:stack/tmp-tst/4dbb72c0-575d-11ef-a00b-0ed8e477be05",
        "RequestId": "06ee38a8-31fd-483d-adb3-615a6f8cfd19",
        "LogicalResourceId": "initdata",
        "PhysicalResourceId": "initdata",
        "ResourceType": "AWS::CloudFormation::CustomResource",
        "ResourceProperties": {
            "ServiceToken": "arn:aws:lambda:us-east-1:017820663979:function:tmp-tst-initdataprvdframeworkonEvent7BB84B21-4DmnNl2Y0NWA",
            "initData": [
                {
                    "pk": {
                        "S": "menu"
                    },
                    "value": {
                        "L": [
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_espresso-alternative"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Espresso"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_cappuccino-alternative"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Cappuccino"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_cafe-latte"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Latte"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_flat-white-alternative@2x"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Flat White"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_americano"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Americano"
                                    }
                                }
                            },
                            {
                                "M": {
                                    "available": {
                                        "BOOL": "true"
                                    },
                                    "icon": {
                                        "S": "barista-icons_americano"
                                    },
                                    "modifiers": {
                                        "L": []
                                    },
                                    "drink": {
                                        "S": "Coffee of the day"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "maxOrdersPerUser": {
                        "N": "1"
                    },
                    "pk": {
                        "S": "config"
                    },
                    "maxOrdersInQueue": {
                        "N": "10"
                    },
                    "storeOpen": {
                        "BOOL": "true"
                    }
                }
            ]
        }
    } as CloudFormationCustomResourceEvent

    const context = {
        done(error?: Error, result?: any): void {
            console.error(error)
        }, fail(error: Error | string): void {
            console.error(error)
        }, getRemainingTimeInMillis(): number {
            return 0;
        }, succeed(message: any, object?: any): void {
            console.info(message)
        },
        "callbackWaitsForEmptyEventLoop": true,
        "functionVersion": "$LATEST",
        "functionName": "odmd-contracts-ghwf_as_pp_490548955090",
        "memoryLimitInMB": "128",
        "logGroupName": "/aws/lambda/odmd-contracts-ghwf_as_pp_490548955090",
        "logStreamName": "2023/09/17/[$LATEST]d0ea6212887e4209a5c75475f6ac86b5",
        "invokedFunctionArn": "arn:aws:lambda:us-west-2:835934552565:function:odmd-contracts-ghwf_as_pp_490548955090",
        "awsRequestId": "335d7c99-34e6-4bb2-ad81-134aecf5591c"
    };
    await (await import( './index' )).handler(deleteEvent, context)
}


// tmpTst().catch(e => {
main().catch(e => {
    console.error("main error>>>")
    console.error(e)
    console.error("main error<<<")
    throw e
}).finally(() => {
    console.log("main end.")
})
//curl -sS -f -I -H "Authorization: token ghp_yourOwnToken" https://api.github.com | grep -i x-oauth-scopes x-oauth-scopes: public_repo, repo:status, repo_deployment
