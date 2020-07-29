import React, { useEffect } from "react";

import styles from "./ResultsGraphView.module.scss";

export interface ResultsGraphViewProps { onLoad: Function };

const ResultsGraphView = (props: ResultsGraphViewProps) => {
    useEffect(() => {
        props.onLoad("FileRebuildPerformanceTest | Results Graph", "/filerebuilderformancetest/results/graph")
    });

    return (
        <div className={styles.resultsPageContainer}>Graph</div>
    );
};

export default ResultsGraphView;