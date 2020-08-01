import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import formatDuration from "../../../../components/formatDuration/formatDuration";

import styles from "./ResultsGraph.module.scss";

export interface ResultsGraphProps { results: Array<any> };

const ResultsGraph = (props: ResultsGraphProps) => {
    // TODO: set the values to true, and update the checkbox default values
    const [hideDetect, setHideDetect] = useState(false);
    const [hideRebuild, setHideRebuild] = useState(false);
    const [hideUpload, setHideUpload] = useState(false);
    const [hideDownload, setHideDownload] = useState(false);
    const [hideResponseTime, setHideResponseTime] = useState(false);

    const labels = props.results[0].results.map((r: any) => r.name.replace("Post_FileForProcessing_", ""));

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
                hidden: hideDetect
            },
            {
                type: "bar",
                label: "Rebuild",
                data: rebuildData,
                fill: false,
                backgroundColor: "#0c3450",
                hoverBackgroundColor: "#196480",
                yAxisID: "y-axis-1",
                hidden: hideRebuild
            },
            {
                type: "bar",
                label: "Upload",
                data: uploadData,
                fill: false,
                backgroundColor: "#1fb3009e",
                hidden: hideUpload
            },
            {
                type: "bar",
                label: "Download",
                data: downloadData,
                fill: false,
                backgroundColor: "#e6e9ea",
                hidden: hideDownload
            },
            {
                type: "bar",
                label: "Response Time",
                data: responseTimeData,
                fill: false,
                backgroundColor: "#00a7ff",
                hidden: hideResponseTime
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
                    }
                },
                { ...yAxesConfig }
            ]
        }
    };

    return (
        <div>
            <h2>Combined Bar Chart</h2>
            <p>These results are from the most recent successful test run.</p>

            <div className={styles.toggleDataContainer}>
                <div className={styles.toggleOption}>
                    <label>Detect</label> <input type="checkbox" onChange={() => setHideDetect(!hideDetect)} />
                </div>
                <div className={styles.toggleOption}>
                    <label>Rebuild</label> <input type="checkbox" onChange={() => setHideRebuild(!hideRebuild)} />
                </div>
                <div className={styles.toggleOption}>
                    <label>Upload</label> <input type="checkbox" onChange={() => setHideUpload(!hideUpload)} />
                </div>
                <div className={styles.toggleOption}>
                    <label>Download</label> <input type="checkbox" onChange={() => setHideDownload(!hideDownload)} />
                </div>
                <div className={styles.toggleOption}>
                    <label>Response Time</label> <input type="checkbox" onChange={() => setHideResponseTime(!hideResponseTime)} />
                </div>
            </div>

            <Bar
                data={data}
                options={options} />
        </div>
    );
};

export default ResultsGraph;