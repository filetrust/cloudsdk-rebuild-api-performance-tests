import os
import sys
import getopt
import json
import boto3
import decimal

usage_string = "usage: get_file_data.py -j <json_file_path> -t <table_name>"

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)


def get_data_from_dynamodb(table_name):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(table_name)

    print(f"Scanning DynamoDB Table: {table_name}")
    response = table.scan()
    responseData = response["Items"]

    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        responseData.extend(response["Items"])

    file_data = []

    for entry in responseData:
        file_data.append({
            "ObjectPath": entry["ObjectPath"],
            "fileName": entry["fileName"],
            "responseThreshold": int(str(entry["responseThreshold"]))
        })

    return file_data


def main(argv):
    json_file_path = ""
    table_name = ""

    try:
        opts, args = getopt.getopt(argv, "hj:t:")
    except getopt.GetoptError:
        print(usage_string)
        sys.exit(2)

    if len(opts) < 2:
        print(usage_string)
        sys.exit(2)

    for opt, arg in opts:
        if opt == "-h" or opt == "":
            print(usage_string)
            sys.exit()
        elif opt in ("-j"):
            json_file_path = arg
        elif opt in ("-t"):
            table_name = arg

    try:
        file_data = get_data_from_dynamodb(table_name)

        file_data_string = json.dumps(file_data, cls=DecimalEncoder, indent=4)

        print(f"Writing File Data to {json_file_path}")        
        print(file_data_string)
        with open(json_file_path, "w") as f:
            f.write(file_data_string)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main(sys.argv[1:])
