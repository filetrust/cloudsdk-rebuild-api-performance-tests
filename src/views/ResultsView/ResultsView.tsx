import React, { useState, useEffect, useCallback } from "react";
import ApiKeyModal from "../../components/ApiKeyModal/ApiKeyModal";

import styles from "./ResultsView.module.scss";

export interface ResultsViewProps {
    apiKey: string,
    onLoad: Function,
    updateApiKey: Function
}

const useMountEffect = (fun: any) => useEffect(fun, [])

const ResultsView = (props: ResultsViewProps) => {
    const getResultsUrl = "https://cqxec6akld.execute-api.eu-west-1.amazonaws.com/prod/filerebuildperformancetest/getresults";

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [apiKeyIsInvalid, setApiKeyIsInvalid] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const getResults = useCallback(async (apiKey?) => {
        try {
            const response = await fetch(getResultsUrl, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey ?? props.apiKey
                }
            });

            let responseString = await response.json();

            if (response.ok) {
                setResults(JSON.parse(responseString));
                setApiKeyIsInvalid(false);
            }
            else {
                if (responseString.message === "Forbidden") {
                    console.error(`Error ${response.status}. Invalid API Key`)
                }
                else {
                    console.error(`Error ${response.status}. ${responseString}`);
                }

                setApiKeyIsInvalid(true);
            }
        }
        catch (e) {
            console.error(e);
            setApiKeyIsInvalid(true);
        }
        finally {
            setLoading(false);
        }
    }, [setResults, props.apiKey, setApiKeyIsInvalid, setLoading]);

    useMountEffect(() => {
        props.onLoad("FileRebuildPerformanceTest | Results");
        getResults()
    });

    const submitNewApiKey = async(newApiKey: string) => {
        setModalIsOpen(false);
        props.updateApiKey(newApiKey);
        await setLoading(true);
        getResults(newApiKey);
    };

    return (
        <div className={styles.resultsPageContainer}>
            <ApiKeyModal
                isOpen={modalIsOpen}
                onCloseAction={() => setModalIsOpen(false)}
                submitFunction={submitNewApiKey} />

            {loading &&
                <div>Loading ... </div>
            }

            {!loading &&
                <>
                    {apiKeyIsInvalid &&
                        <div>
                            Your API Key is invalid.
                            Click <button
                                className={styles.buttonLink}
                                type="button"
                                onClick={() => setModalIsOpen(true)}>here</button> to enter a new one.
                        </div>
                    }

                    {results.length === 0 && !apiKeyIsInvalid &&
                        <div>
                            <h1>No results found...</h1>
                        </div>
                    }

                    {results.length > 0 &&
                        <div>
                            {results.map(row => {
                                return (
                                    <div className={styles.resultRow} key={row.timestamp}>
                                        <div className={styles.timestamp}>{row.timestamp}</div>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Filename</th>
                                                    <th>File Size</th>
                                                    <th>Detect Filetype</th>
                                                    <th>Rebuild</th>
                                                    <th>Upload</th>
                                                    <th>Download</th>
                                                    <th>Response Time</th>
                                                    <th>Engine Version</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {row.results.map((result: any) => {
                                                    return (
                                                        <tr key={result.requestId}>
                                                            <td>{result.name}</td>
                                                            <td>{result.metricFilesize}</td>
                                                            <td>{result.metricDetect}</td>
                                                            <td>{result.metricRebuild}</td>
                                                            <td>{result.metricUpload}</td>
                                                            <td>{result.metricDownload}</td>
                                                            <td>{result.responseTime}</td>
                                                            <td>{result.version}</td>
                                                        </tr>
                                                    );
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    }

                </>
            }
        </div>
    );
};

export default ResultsView;