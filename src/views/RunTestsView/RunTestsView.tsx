import React, { useEffect } from "react";

export interface RunTestsViewProps { onLoad: Function };

const RunTestsView = (props: RunTestsViewProps) => {
    useEffect(() => {
        props.onLoad("Run a Test");
    }, [props])
    return <div>run test</div>
};

export default RunTestsView;