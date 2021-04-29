# Use a minimal base image with OpenJDK installed
FROM openjdk:8-jre

# Install packages
RUN apt-get update && \
    apt-get -y install python-pip && \
    pip install awscli && \
    apt-get -y install python3.7 && \
    apt-get -y install python3-pip && \
    pip3 install boto3

# Set variables
ENV JMETER_HOME=/usr/share/apache-jmeter \
    JMETER_VERSION=3.3 \
    WEB_SOCKET_SAMPLER_VERSION=1.2 \
    CONVERT_JSON_PYTHON_SCRIPT=/Test/xml_to_json.py \
    GET_FILE_DATA_PYTHON_SCRIPT=/Test/get_file_data.py \
    GET_SECRETS_PYTHON_SCRIPT=/Test/get_secrets.py \
    UPLOAD_RESULTS_SCRIPT=/Test/upload_results.py \
    DYNAMODB_RESULTS_TABLE_NAME=FileRebuildPerformanceTest-Results \
    TEST_SCRIPT_FILE=/Test/FileRebuildPerformanceTest.jmx \
    DYNAMODB_TEST_DATA_TABLE_NAME=RebuildApiPerformanceTests-FileData \
    TEST_VARIABLES_SECRET_NAME=filerebuildperformancetest \
    REGION=eu-west-1 \    
    FILE_DATA_FILE=/Test/FileData.json \
    TEST_LOG_FILE=/Test/test.log \
    TEST_RESULTS_PATH=/Test/Results/FileRebuildResults.xml \
    TEST_RESULTS_JSON_PATH=/Test/Results/FileRebuildResults.json \
    AWS_DEFAULT_REGION=eu-west-1 \
    PATH="~/.local/bin:$PATH" \
    JVM_ARGS="-Xms2048m -Xmx4096m -XX:NewSize=1024m -XX:MaxNewSize=2048m -Duser.timezone=UTC"

# Install Apache JMeter
RUN wget http://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz && \
    tar zxvf apache-jmeter-${JMETER_VERSION}.tgz && \
    rm -f apache-jmeter-${JMETER_VERSION}.tgz && \
    mv apache-jmeter-${JMETER_VERSION} ${JMETER_HOME}

# Copy Test Script and File Data
COPY FileRebuildPerformanceTest.jmx ${TEST_SCRIPT_FILE}
COPY xml_to_json.py ${CONVERT_JSON_PYTHON_SCRIPT}
COPY upload_results.py ${UPLOAD_RESULTS_SCRIPT}
COPY get_file_data.py ${GET_FILE_DATA_PYTHON_SCRIPT}
COPY get_secrets.py ${GET_SECRETS_PYTHON_SCRIPT}

CMD echo "\n\n===== RETRIEVING FILE DATA =====\n\n" && \
    python3.7 $GET_FILE_DATA_PYTHON_SCRIPT -j $FILE_DATA_FILE -t $DYNAMODB_TEST_DATA_TABLE_NAME && \
    echo "\n\n===== SETTING UP TEST SCRIPT =====\n\n" && \
    python3.7 $GET_SECRETS_PYTHON_SCRIPT -s $TEST_VARIABLES_SECRET_NAME -r $REGION -t $TEST_SCRIPT_FILE && \
    echo "\n\n===== RUNNING TESTS =====\n\n" && \
    $JMETER_HOME/bin/jmeter -n -t $TEST_SCRIPT_FILE -j $TEST_LOG_FILE && \
    echo "\n\n===== TEST LOGS =====\n\n" && \
    cat $TEST_LOG_FILE && \
    echo "\n\n===== TEST RESULTS =====\n\n" && \
    cat $TEST_RESULTS_PATH && \
    echo "\n\n===== CONVERTING XML =====\n\n" && \
    python3.7 $CONVERT_JSON_PYTHON_SCRIPT -i $TEST_RESULTS_PATH -o $TEST_RESULTS_JSON_PATH && \
    echo "\n\n===== UPLOADING RESULTS =====\n\n" && \
    python3.7 $UPLOAD_RESULTS_SCRIPT -j $TEST_RESULTS_JSON_PATH -t $DYNAMODB_RESULTS_TABLE_NAME    
