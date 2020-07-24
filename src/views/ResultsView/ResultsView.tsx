import React, { useState, useEffect } from "react";

import styles from "./ResultsView.module.scss";

export interface ResultsViewProps { apiKey: string, onLoad: Function }

const ResultsView = (props: ResultsViewProps) => {
    const getResultsUrl = "https://cqxec6akld.execute-api.eu-west-1.amazonaws.com/prod/filerebuildperformancetest/getresults";
    const [results, setResults] = useState([]);

    const getResults = async () => {
        try {
            const response = await fetch(getResultsUrl, {
                method: "GET",
                headers: {
                    "x-api-key": props.apiKey
                }
            });

            if (response.ok) {
                let results = await response.json();
                results = JSON.parse(results);
                setResults(results);
            }
            else {
                console.error(response.status);
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        props.onLoad("View Test Results");
        getResults()
    }, [getResults, props]);

    return (
        <div className={styles.resultsPageContainer}>
            {results.length === 0 &&
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
        </div>
    );
};

export default ResultsView;