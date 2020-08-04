import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import formatDuration from "../../../../components/formatDuration/formatDuration";

import styles from "./ResultsGraph.module.scss";

export interface ResultsGraphProps { results: Array<any> };

const formatTimestamp = (datetimeString: string) =>
    new Date(datetimeString).toLocaleString().replace(",", " -");

const formatFileSize = (fileSize: number) => `${Math.floor(fileSize / 1000000)} MB`;

const ResultsGraph = (props: ResultsGraphProps) => {
    // TODO: set the values to true, and update the checkbox default values
    const [showDetect, setshowDetect] = useState(false);
    const [showRebuild, setshowRebuild] = useState(true);
    const [showUpload, setshowUpload] = useState(false);
    const [showDownload, setshowDownload] = useState(false);
    const [showResponseTime, setshowResponseTime] = useState(false);

    const labels = props.results[0].results.map((r: any) => {
        let fs = formatFileSize(r.metricFilesize);
        let label = r.name.replace("Post_FileForProcessing_", "");
        return `${label} (${fs})`
    });

    const detectData = props.results[0].results.map((r: any) => formatDuration(r.metricDetect));
    const rebuildData = props.results[0].results.map((r: any) => formatDuration(r.metricRebuild));
    const uploadData = props.results[0].results.map((r: any) => formatDuration(r.metricUpload));
    const downloadData = props.results[0].results.map((r: any) => formatDuration(r.metricDownload));
    const responseTimeData = props.results[0].results.map((r: any) => r.responseTime / 1000);

    const data = {
        datasets: [
            {
                type: "bar",
                label: "Detect",
                data: detectData,
                fill: false,
                borderColor: "#EC932F",
                backgroundColor: "#EC932F",
                pointBackgroundColor: "#EC932F",
                pointHoverBackgroundColor: "#EC932F",
                yAxisID: "y-axis-2",
                hidden: !showDetect
            },
            {
                type: "bar",
                label: "Rebuild",
                data: rebuildData,
                fill: false,
                backgroundColor: "#0c3450",
                hoverBackgroundColor: "#196480",
                yAxisID: "y-axis-1",
                hidden: !showRebuild
            },
            {
                type: "bar",
                label: "Upload",
                data: uploadData,
                fill: false,
                backgroundColor: "#1fb3009e",
                hidden: !showUpload
            },
            {
                type: "bar",
                label: "Download",
                data: downloadData,
                fill: false,
                backgroundColor: "#e6e9ea",
                hidden: !showDownload
            },
            {
                type: "bar",
                label: "Response Time",
                data: responseTimeData,
                fill: false,
                backgroundColor: "#00a7ff",
                hidden: !showResponseTime
            }
        ]
    };

    const yAxesConfig = {
        display: false,
        gridLines: {
            display: false
        },
        ticks: {
            max: 2,
            min: 0
        }
    };

    const options = {
        responsive: true,
        tooltips: {
            mode: "label"
        },
        elements: {
            line: {
                fill: false
            }
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: labels,
                }
            ],
            yAxes: [
                {
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Duration (seconds)"
                    }
                },
                { ...yAxesConfig }
            ]
        }
    };

    return (
        <div>
            <p>These results are from the most recent successful test run: <strong>{formatTimestamp(props.results[0].timestamp)}</strong></p>

            <div className={styles.toggleDataContainer}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <label>Detect <input type="checkbox"
                            onChange={() => setshowDetect(!showDetect)}
                            defaultChecked={showDetect} /></label>
                    </div>
                    <div className={styles.column}>
                        <label>Rebuild <input type="checkbox"
                            onChange={() => setshowRebuild(!showRebuild)}
                            defaultChecked={showRebuild} /></label>
                    </div>
                    <div className={styles.column}>
                        <label>Upload <input type="checkbox"
                            onChange={() => setshowUpload(!showUpload)}
                            defaultChecked={showUpload} /></label>
                    </div>
                    <div className={styles.column}>
                        <label>Download <input type="checkbox"
                            onChange={() => setshowDownload(!showDownload)}
                            defaultChecked={showDownload} /></label>
                    </div>
                    <div className={styles.column}>
                        <label>Response Time <input type="checkbox"
                            onChange={() => setshowResponseTime(!showResponseTime)}
                            defaultChecked={showResponseTime} /></label>
                    </div>
                </div>
            </div>

            <Bar
                data={data}
                options={options} />
        </div>
    );
};

export default ResultsGraph;