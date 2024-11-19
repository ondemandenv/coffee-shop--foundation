import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as fs from "node:fs";
import {EventBus, Rule} from "aws-cdk-lib/aws-events";
import {CloudWatchLogGroup} from "aws-cdk-lib/aws-events-targets";
import {LogGroup, RetentionDays} from "aws-cdk-lib/aws-logs";
import {AttributeType, BillingMode, Table} from "aws-cdk-lib/aws-dynamodb";
import {RemovalPolicy} from "aws-cdk-lib";
import {InitDynamoDb} from "./init-dynamodb";
import {marshall} from "@aws-sdk/util-dynamodb";
import {OdmdCrossRefProducer, OdmdEnverCdk, OdmdShareOut} from "@ondemandenv/contracts-lib-base";
import {
    CoffeeShopFoundationEnver,
    OndemandContractsSandbox,
    SampleSpringOpenApi3CdkEnver
} from "@ondemandenv/odmd-contracts-sandbox";
import {Attribute} from "aws-cdk-lib/aws-dynamodb/lib/shared";


export class CoffeeShopFoundationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const eventBus = new EventBus(this, 'coffee-shop-event-bus')
        new Rule(this, 'log-all', {
            eventBus,
            eventPattern: {source: [eventBus.eventBusName]},
            targets: [new CloudWatchLogGroup(new LogGroup(this, 'logAll-log-group', {retention: RetentionDays.TWO_WEEKS}))]
        })

        let configTableProps = {
            partitionKey: {name: 'PK', type: AttributeType.STRING},
            billingMode: BillingMode.PAY_PER_REQUEST,
            // billing: Billing.onDemand(),
            removalPolicy: RemovalPolicy.DESTROY
        } as { partitionKey: Attribute }
        const configTable = new Table(this, 'configTable', configTableProps);

        new InitDynamoDb(this, 'init-configTable', {
            table: configTable, data: [
                JSON.parse(fs.readFileSync(__dirname + `/menu.json`).toString("utf-8")),
                marshall({
                    "PK": "config",
                    "maxOrdersInQueue": 10,
                    "maxOrdersPerUser": 1,
                    "storeOpen": true
                })
            ],
            partitionKey: configTableProps.partitionKey
        })

        const countableProps = {
            partitionKey: {name: 'PK', type: AttributeType.STRING},
            billingMode: BillingMode.PAY_PER_REQUEST,
            // billing: Billing.onDemand(),
            removalPolicy: RemovalPolicy.DESTROY
        } as { partitionKey: Attribute };
        const countingTable = new Table(this, 'countingTable-tmp', countableProps)

        new InitDynamoDb(this, 'init-countTable', {
            table: countingTable, data: [
                marshall({[countableProps.partitionKey.name]: 'orderID', IDvalue: 0})
            ],
            partitionKey: countableProps.partitionKey
        })

        const myEnver = OndemandContractsSandbox.inst.getTargetEnver() as CoffeeShopFoundationEnver

        new OdmdShareOut(
            this, new Map<OdmdCrossRefProducer<CoffeeShopFoundationEnver>, any>([
                [myEnver.configTableName, configTable.tableName],
                [myEnver.countTableName, countingTable.tableName],
                [myEnver.eventBusSrc, eventBus.eventBusName],
                [myEnver.eventBusSrc.source, eventBus.eventBusName],
            ])
        )

    }
}
