import boto3
import os
import json

def lambda_handler(event, context):
    # Required Environment Variables:
    # cluster: name of the ECS cluster
    # taskDefinition: name and revision of the taskDefinition
    # subnets: comma-separated list of subnets for the task to run in
    # securityGroups: comma-separated list of security groups for the task
    client = boto3.client("ecs")
    response = client.run_task(
        cluster=os.environ["cluster"],
        launchType="FARGATE",
        taskDefinition=os.environ["taskDefinition"],
        count=1,
        platformVersion="LATEST",
        networkConfiguration={
            "awsvpcConfiguration": {
                "subnets": os.environ["subnets"].split(","),
                "securityGroups": os.environ["securityGroups"].split(","),
                "assignPublicIp": "ENABLED"
            }
        }
    )

    return str(response)