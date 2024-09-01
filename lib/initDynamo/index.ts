import {CloudFormationCustomResourceEvent} from "aws-lambda";
import {AttributeValue, BatchWriteItemCommand, DynamoDBClient, WriteRequest,} from "@aws-sdk/client-dynamodb";

import * as resp from "cfn-response"
import {DeleteRequest} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";


export async function handler(event: CloudFormationCustomResourceEvent, context: any) {

    console.log('>>>>')
    console.log(JSON.stringify(event))
    console.log('-----')
    console.log(JSON.stringify(process.env))
    console.log('<<<<')
    const dynamo = new DynamoDBClient({})
    /*
        await dynamo.send(new BatchExecuteStatementCommand({Statements: [{Statement: ``, Parameters:[{M:}]}], }))
    */


    const tableName = event.ResourceProperties.tableName as string
    const partitionKeyName = event.ResourceProperties.partitionKeyName as string
    const initData = event.ResourceProperties.initData as Record<string, AttributeValue>[];
    if (event.RequestType == "Delete") {
        const RequestItems: Record<string, WriteRequest[]> = {};
        RequestItems[tableName] = initData.map(record => {
            const deleteRequest = {Key: {[partitionKeyName]: record[partitionKeyName]}} as DeleteRequest;
            if (event.ResourceProperties.sortKeyName) {
                deleteRequest.Key![event.ResourceProperties.sortKeyName] = record [event.ResourceProperties.sortKeyName]
            }
            console.log(deleteRequest)
            return {DeleteRequest: deleteRequest}
        })
        await dynamo.send(new BatchWriteItemCommand({RequestItems}))
    } else {
        const RequestItems: Record<string, WriteRequest[]> = {};
        RequestItems[tableName] = initData.map(Item => {
            return {PutRequest: {Item}} as WriteRequest
        })
        await dynamo.send(new BatchWriteItemCommand({RequestItems}))
    }
    await new Promise((resolve, reject) => {
        resp.send(event, context, resp.SUCCESS)
        context.done = resolve
    })

}
