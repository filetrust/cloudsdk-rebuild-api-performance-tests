import React, { useEffect } from "react";

import styles from "./ArchitectureView.module.scss";

export interface ArchitectureViewProps { onLoad: Function }

const ArchitectureView = (props: ArchitectureViewProps) => {

    useEffect(() => {
        props.onLoad("Architecture", "Architecture");
    });

    return (
        <div className={styles.architecturePageContainer}>
            <h3>Executing a Test</h3>
            <hr />
            <img src="https://raw.githubusercontent.com/ahewitt-glasswall/mvp-rebuild-performance-tests/master/documents/architecture/architecture.png"
                alt="Overall architecture for running a test." />

            <h3>Inside the Docker Container</h3>
            <hr />
            <img src="https://raw.githubusercontent.com/ahewitt-glasswall/mvp-rebuild-performance-tests/master/documents/architecture/dockerSequence.png"
                alt="Sequence diagram for the docker container tests run in." />
        </div>
    );
};

export default ArchitectureView;