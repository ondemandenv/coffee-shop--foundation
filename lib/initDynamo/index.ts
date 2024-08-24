import {CloudFormationCustomResourceEvent} from "aws-lambda";
import {BatchWriteItemCommand, DynamoDBClient, WriteRequest,} from "@aws-sdk/client-dynamodb";

import * as resp from "cfn-response"


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
    const initData = event.ResourceProperties.initData as Array<any>;
    if (event.RequestType == "Delete") {
        const RequestItems: Record<string, WriteRequest[]> = {};
        RequestItems[tableName] = initData.map(i => {
            let deleteRequest = {Key: {pk: i.pk}};
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
