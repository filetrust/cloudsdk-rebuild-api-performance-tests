import boto3
import json
import os
import decimal


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)


def lambda_handler(event, context):
    # Required Environment Variables
    # tableName: name of the dynamodb table
    table_name = os.environ["tableName"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(table_name)

    print(f"Scanning DynamoDB Table: {table_name}")
    response = table.scan()
    responseData = response["Items"]

    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        responseData.extend(response["Items"])

    results = []


    for entry in responseData:
        results.append({
            "timestamp": entry["timestamp"],
            "results": entry["map"]["results"]
        })

    print(f"Sorting Results: {results}")

    timestamps = [r["timestamp"] for r in results]
    timestamps.sort(reverse=True)
    return_data = [
        result for timestamp in timestamps
        for result in results
        if timestamp == result["timestamp"]
    ]

    return json.dumps(return_data, cls=DecimalEncoder)
