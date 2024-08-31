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
import {ContractsCrossRefProducer, ContractsShareOut, OndemandContracts} from "@ondemandenv/odmd-contracts";
import {CoffeeShopFoundationEnver} from "@ondemandenv/odmd-contracts/lib/repos/coffee-shop/coffee-shop-foundation-cdk";


export class CoffeeShopFoundationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const eventBus = new EventBus(this, 'coffee-shop-event-bus')
        new Rule(this, 'log-all', {
            eventBus,
            eventPattern: {source: [eventBus.eventBusName]},
            targets: [new CloudWatchLogGroup(new LogGroup(this, 'logAll-log-group', {retention: RetentionDays.TWO_WEEKS}))]
        })

        const configTable = new Table(this, 'configTable', {
            partitionKey: {name: 'pk', type: AttributeType.STRING},
            billingMode: BillingMode.PAY_PER_REQUEST,
            // billing: Billing.onDemand(),
            removalPolicy: RemovalPolicy.DESTROY
        });

        new InitDynamoDb(this, 'init-configTable', {
            table: configTable, data: [
                JSON.parse(fs.readFileSync(__dirname + `/menu.json`).toString("utf-8")),
                marshall({
                    "pk": "config",
                    "maxOrdersInQueue": 10,
                    "maxOrdersPerUser": 1,
                    "storeOpen": true
                })
            ]
        })

        const countTablePk = {name: 'pk', type: AttributeType.STRING};
        const countingTable = new Table(this, 'countingTable-tmp', {
            partitionKey: countTablePk,
            billingMode: BillingMode.PAY_PER_REQUEST,
            // billing: Billing.onDemand(),
            removalPolicy: RemovalPolicy.DESTROY
        })

        new InitDynamoDb(this, 'init-countTable', {
            table: countingTable, data: [
                marshall({[countTablePk.name]: 'orderID', IDvalue: 0})
            ]
        })

        const myEnver = OndemandContracts.inst.getTargetEnver() as CoffeeShopFoundationEnver

        new ContractsShareOut(
            this, new Map<ContractsCrossRefProducer<CoffeeShopFoundationEnver>, any>([
                [myEnver.configTableName, configTable.tableName],
                [myEnver.countTableName, countingTable.tableName],
                [myEnver.eventBusSrc, eventBus.eventBusName],
                [myEnver.eventBusSrc.source, eventBus.eventBusName],
            ])
        )

    }
}
