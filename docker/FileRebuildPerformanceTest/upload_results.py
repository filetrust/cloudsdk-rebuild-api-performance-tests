#!/usr/bin/python
import os
import sys
import getopt
import boto3
import json
from datetime import datetime

usage_string = "usage: upload_results.py -j <json_file> -t <table_name>"


def main(argv):
    json_file = ""
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
            json_file = arg
        elif opt in ("-t"):
            table_name = arg

    try:
        with open(json_file, "r") as f:
            result_data = json.load(f)

        if len(result_data) > 0:
            timestamp = str(datetime.now())

            results_json = {
                "results": result_data
            }

            dynamodb = boto3.resource('dynamodb')
            table = dynamodb.Table(table_name)
            table.put_item(Item={"timestamp": timestamp, "map": results_json})
            print(f"Uploaded results to table: {table_name}. Timestamp: {timestamp}")
        else:
            print(f"Results file was empty.")
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main(sys.argv[1:])
