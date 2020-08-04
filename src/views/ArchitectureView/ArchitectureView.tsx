import React, { useEffect } from "react";
import ArchitectureImage from "./architecture.png";
import DockerSequenceImage from "./dockerSequence.png";

import styles from "./ArchitectureView.module.scss";

export interface ArchitectureViewProps { onLoad: Function }

const ArchitectureView = (props: ArchitectureViewProps) => {

    useEffect(() => {
        props.onLoad("Architecture", "Architecture");
    });

    return (
        <div className={styles.architecturePageContainer}>
            <h3>Executing a Test</h3>
            <img src={ArchitectureImage} />
            <hr />
            <h3>Docker Image</h3>
            <img src={DockerSequenceImage} />
        </div>
    );
};

export default ArchitectureView;