import React from "react";
import GlasswallTable from "../../../../components/GlasswallTable/GlasswallTable";

import styles from "./ResultsTable.module.scss";

export interface ResultsTableProps { results: Array<any> };

const formatTimestamp = (datetimeString: string) =>
    new Date(datetimeString).toLocaleString().replace(",", " -");

const formatFileSize = (fileSize: number) => `${Math.floor(fileSize / 1000000)} MB`;

const formatDuration = (duration: string) => {
    let ms = parseFloat(`0.${duration.split(".")[1]}`);
    let hms = duration.split(":");

    let seconds = (parseInt(hms[0], 2) * 3600) + (parseInt(hms[1], 2) * 60) + (parseInt(hms[2], 2)) + ms;

    return `${seconds} s`;
};

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
                                            <td className={styles.filenameCell}>{result.name}</td>
                                            <td>{formatFileSize(result.metricFilesize)}</td>
                                            <td>{formatDuration(result.metricDetect)}</td>
                                            <td>{formatDuration(result.metricRebuild)}</td>
                                            <td>{formatDuration(result.metricUpload)}</td>
                                            <td>{formatDuration(result.metricDownload)}</td>
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