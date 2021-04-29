import os
import sys
import getopt
import boto3
import base64
import json
from botocore.exceptions import ClientError
import xml.etree.ElementTree as ET


usage_string = "usage: get_secrets.py -s <secret_name> -r <region> -t <test_script_file_path>"


def get_secret(secret_name, region):
    # secret_name = "filerebuildperformancetest"
    # region = "eu-west-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            # Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            # An error occurred on the server side.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            # You provided an invalid value for a parameter.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            # You provided a parameter value that is not valid for the current state of the resource.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            # We can't find the resource that you asked for.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
    else:
        # Decrypts secret using the associated KMS CMK.
        # Depending on whether the secret is a string or binary, one of these fields will be populated.
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            decoded_binary_secret = base64.b64decode(
                get_secret_value_response['SecretBinary'])

    return json.loads(secret)


def main(argv):
    secret_name = ""
    region = ""
    test_script_file_path = ""

    try:
        opts, args = getopt.getopt(argv, "hs:r:t:")
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
        elif opt in ("-s"):
            secret_name = arg
        elif opt in ("-r"):
            region = arg
        elif opt in ("-t"):
            test_script_file_path = arg

    try:
        secret = get_secret(secret_name, region)

        jmeter_variables = {
            'AwsRegion': secret["region"],
            'RebuildApiDomainID': secret["rebuildApiDomainID"],
            'RebuildApiPath': secret["rebuildApiPath"],
            'RebuildApiKey': secret["rebuildApiKey"],
            'S3UploadDomainID': secret["s3UploadDomainID"],
            'S3UploadKey': secret["s3UploadKey"],
            'S3Upload_GetReadUrl': secret["s3Upload_GetReadUrl"],
            'S3Upload_GetWriteUrl': secret["s3Upload_GetWriteUrl"],
            'bucketName': secret["bucketName"],
            'BaseDirectory': "/Test/"
        }

        tree = ET.parse(test_script_file_path)
        root = tree.getroot()
        for element in root.findall('hashTree/hashTree/Arguments/collectionProp/elementProp'):
            for arg in element.findall('stringProp'):
                if arg.attrib.get('name') == "Argument.name":
                    name = arg.text
                    print(f"Replacing Secret: {name}")
                elif arg.attrib.get('name') == "Argument.value":
                    value = arg.text
                    newValue = jmeter_variables[name]
                    arg.text = newValue

        tree.write(test_script_file_path)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main(sys.argv[1:])
