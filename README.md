# Rebuild API Performance Tests
![CI](https://github.com/ahewitt-glasswall/mvp-rebuild-performance-tests/workflows/CI/badge.svg)
![CD](https://github.com/ahewitt-glasswall/mvp-rebuild-performance-tests/workflows/CD/badge.svg)


A Minimum Viable Product for demonstrations of the Automated Performance Tests on Glasswall's Rebuild API.<br/>
You can see it live at https://filetrust.github.io/cloudsdk-rebuild-api-performance-tests/<br/>
Here's the documentation for [Glasswall Rebuild](https://engineering.glasswallsolutions.com/docs/product-descriptions/product-overview)

# Architecture
## Overall Architecture
![Overall Architecture Diagram](https://raw.githubusercontent.com/ahewitt-glasswall/mvp-rebuild-performance-tests/master/documents/architecture/architecture.png)
1. API Request to trigger the startTest lambda function. This function connects to the ECS cluster and kicks off a task. The task, in this case is a docker container with the test script pre-loaded.
2. The first command running in the docker container is a python script that retrieves a JSON array of file paths from DynamoDB. These file paths correspond to the test files held in S3.
3. The next step is running the JMeter performance test script. The script retrieves a presigned url from S3, for each of the file paths retrieved from DynamoDB in step 2.
4. The JMeter script then sends the files through to the Rebuild API, and records the results, along with some metrics from the response header of each request.
5. The next step is a python script that extracts the results from JMeter (XML) and saves them as JSON.
6. Finally, the results have been converted to JSON and the last python script uploads them to the results table in DynamoDB, with a timestamp as the partition key.

## Inside the Docker Container
![Inside the Docker Container - Sequence Diagram](https://raw.githubusercontent.com/ahewitt-glasswall/mvp-rebuild-performance-tests/master/documents/architecture/dockerSequence.png)

