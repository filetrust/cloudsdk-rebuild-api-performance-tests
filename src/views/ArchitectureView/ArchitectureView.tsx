import React, { useEffect } from "react";

export interface ArchitectureViewProps { onLoad: Function }

const ArchitectureView = (props: ArchitectureViewProps) => {    

    useEffect(() => {
        props.onLoad("Architecture", "Architecture");
    });

    return <div>Architecture</div>
};

export default ArchitectureView;