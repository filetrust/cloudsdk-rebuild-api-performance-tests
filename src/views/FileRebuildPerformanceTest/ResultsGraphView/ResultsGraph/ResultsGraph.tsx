import React from "react";
import { Bar } from "react-chartjs-2";
import formatDuration from "../../../../components/formatDuration/formatDuration";

export interface ResultsGraphProps { results: Array<any> };

const ResultsGraph = (props: ResultsGraphProps) => {
    const labels = props.results[0].results.map((r: any) => r.name.replace("Post_FileForProcessing_", ""));
    const detectData = props.results[0].results.map((r: any) => formatDuration(r.metricDetect));
    const rebuildData = props.results[0].results.map((r: any) => formatDuration(r.metricRebuild));
    const uploadData = props.results[0].results.map((r: any) => formatDuration(r.metricUpload));
    const downloadData = props.results[0].results.map((r: any) => formatDuration(r.metricDownload));

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
                yAxisID: "y-axis-2"
            },
            {
                type: "bar",
                label: "Rebuild",
                data: rebuildData,
                fill: false,
                backgroundColor: "#0c3450",
                hoverBackgroundColor: "#196480",
                yAxisID: "y-axis-1"
            },
            {
                type: "bar",
                label: "Upload",
                data: uploadData,
                fill: false,
                backgroundColor: "#1fb3009e"
            },
            {
                type: "bar",
                label: "Download",
                data: downloadData,
                fill: false,
                backgroundColor: "#e6e9ea"
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
            <Bar
                data={data}
                options={options} />
        </div>
    );
};

export default ResultsGraph;