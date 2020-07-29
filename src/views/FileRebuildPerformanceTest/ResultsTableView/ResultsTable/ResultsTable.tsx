import React from "react";
import GlasswallTable from "../../../../components/GlasswallTable/GlasswallTable";

import styles from "./ResultsTable.module.scss";

export interface ResultsTableProps { results: Array<any> };

const formatTimestamp = (datetimeString: string) =>
    new Date(datetimeString).toLocaleString().replace(",", " -");

const formatFileSize = (fileSize: number) => `${Math.floor(fileSize/1000000)} MB`;

const ResultsTable = (props: ResultsTableProps) => {
    return (
        <div>
            {props.results.map(row => {
                return (
                    <div className={styles.resultRow} key={row.timestamp}>
                        <div className={styles.timestamp}>
                            {formatTimestamp(row.timestamp)}
                        </div>

                        <GlasswallTable>
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
                                            <td>{formatFileSize(result.metricFilesize)}</td>
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
                        </GlasswallTable>
                    </div>
                );
            })}
        </div>
    );
};

export default ResultsTable;