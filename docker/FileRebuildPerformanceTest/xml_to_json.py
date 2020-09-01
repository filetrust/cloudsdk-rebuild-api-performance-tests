#!/usr/bin/python
import sys
import getopt
import xml.etree.ElementTree as ET
import json

usage_string = "usage: xml_to_json.py -i <input_file> -o <output_file>"


class FileRebuildResult:
    def __init__(self):
        pass

    name = ""
    responseCode = ""
    requestId = ""
    metricUpload = ""
    metricDetect = ""
    metricDownload = ""
    version = ""
    metricRebuild = ""
    metricFilesize = 0
    responseTime = 0
    responseText = ""


def main(argv):
    input_file = ""
    output_file = ""

    try:
        opts, args = getopt.getopt(argv, "hi:o:")
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
        elif opt in ("-i"):
            input_file = arg
        elif opt in ("-o"):
            output_file = arg

    resonse_keys = [
        "x-amzn-RequestId",
        "gw-metric-upload",
        "gw-metric-detect",
        "gw-metric-download",
        "gw-version",
        "gw-metric-rebuild",
        "gw-metric-filesize",
    ]

    tree = ET.parse(input_file)

    root = tree.getroot()

    with open(output_file, "w") as f:
        data = []
        null_timestamp_string = "00:00:00.0000000"

        for http_sample_with_post in [item for item in root.findall("./httpSample") if item.attrib.get("lb").startswith("Post_")]:
            result = FileRebuildResult()

            response = {}

            result.name = http_sample_with_post.attrib.get("lb")
            result.responseCode = http_sample_with_post.attrib.get("rc")
            result.responseTime = int(http_sample_with_post.attrib.get("t")) if http_sample_with_post.attrib.get("t") else 0

            if result.responseCode == "200":
                text = http_sample_with_post.find(
                    "responseHeader").text.splitlines()

                for item in text:
                    i = item.split(": ", 1)
                    if i[0] in resonse_keys:
                        response[i[0]] = i[1]

                result.responseText = http_sample_with_post.find("responseData").text if http_sample_with_post.find("responseData") else ""
                result.requestId = response.get("x-amzn-RequestId") or "Unknown"
                result.metricUpload = response.get("gw-metric-upload") or null_timestamp_string
                result.metricDetect = response.get("gw-metric-detect") or null_timestamp_string
                result.metricDownload = response.get("gw-metric-download") or null_timestamp_string
                result.version = response.get("gw-version") or "Unknown"
                result.metricRebuild = response.get("gw-metric-rebuild") or null_timestamp_string
                result.metricFilesize = int(response.get("gw-metric-filesize")) if response.get("gw-metric-filesize") else 0

            data.append(result.__dict__)
            print(f"Writing entry: {json.dumps(result.__dict__, indent=4)}")

        f.write(json.dumps(data))

    print("Done.")


if __name__ == "__main__":
    main(sys.argv[1:])
