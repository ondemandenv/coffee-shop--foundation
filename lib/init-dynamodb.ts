import {Construct} from "constructs";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";
import {CustomResource, Stack} from "aws-cdk-lib";
import {Table, TableV2} from "aws-cdk-lib/aws-dynamodb";
import {Attribute} from "aws-cdk-lib/aws-dynamodb/lib/shared";
import {AttributeValue} from "@aws-sdk/client-dynamodb";

export interface InitDynamoDbProps {
    table: Table | TableV2
    partitionKey: Attribute
    sorKey?: Attribute
    data: Record<string, AttributeValue>[]
}

export class InitDynamoDb extends Construct {
    constructor(scope: Construct, id: string, props: InitDynamoDbProps) {
        super(scope, id);
        const myStack = Stack.of(this);
        const funcId = 'init-data-func';

        const found: NodejsFunction = myStack.node.findAll().find(n => n.node.id == funcId && n instanceof NodejsFunction) as NodejsFunction;

        const nodejsFunction = found ?? new NodejsFunction(myStack, funcId, {
            entry: path.join(__dirname, '/initDynamo/index.ts'),
        });
        props.table.grantFullAccess(nodejsFunction)
        new CustomResource(this, 'init-data', {
            serviceToken: nodejsFunction.functionArn,
            properties: {
                tableName: props.table.tableName,
                partitionKeyName: props.partitionKey.name,
                sortKeyName: props.sorKey?.name,
                initData: props.data
            }
        })

    }
}