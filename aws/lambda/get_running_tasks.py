import boto3
import json
import os
import decimal


def lambda_handler(event, context):
    # Required Environment Variables:
    # cluster: name of the ECS cluster
    # taskFamilyName: name of the task family that the task belongs to
    cluster_name = os.environ["cluster"]

    task_family_name = f'family:{os.environ["taskFamilyName"]}'

    client = boto3.client("ecs")

    running_tasks = client.list_tasks(cluster=cluster_name)

    tasks = []
    if len(running_tasks["taskArns"]) > 0:
        response = client.describe_tasks(
            cluster=cluster_name, tasks=running_tasks["taskArns"])

        for task in response["tasks"]:
            if task["group"] == task_family_name:
                t = {
                    "timestamp": task["createdAt"].strftime("%Y-%m-%d %H:%M:%S"),
                    "status": task["lastStatus"],
                    "group": task["group"]
                }

            tasks.append(t)

    return json.dumps(tasks)
